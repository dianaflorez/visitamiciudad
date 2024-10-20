//========================================
// Este archivo interactúa con la base de datos, específicamente con la tabla de Becario.
// Establece los métodos Get, getAll, Post, Put y Delete según sea necesario.
// IMPORTA:
//      'db': La clase db para la gestión de la base de datos.
//      'Becario': Modelo con el que interactua
// EXPORTA: El controller de Becario
//========================================

const fs = require('fs');
const path = require('path');
const { db } = require('./src/db/db.config');

// Ruta donde se guardarán los controladores
const controllersPath = path.resolve(__dirname, './src/Controllers/ModelControllers');

const getAssociations = (modelName) => {
    const model = db.models[modelName];
    const associations = [];
    const attributes = Object.keys(model.getAttributes())

    if (model && model.associations) {
        for (const associationName in model.associations) {
            const association = model.associations[associationName];

            if (association.associationType === 'BelongsTo'){
                const associatedModel = association.target;
                const as = association.options.as;
    
                // Obtener los atributos del modelo asociado
                const attributesObj = associatedModel.getAttributes();
                const attributeName = associatedModel.name; 
                const attributes = attributeName in attributesObj ? [attributeName] : undefined;
    
                associations.push({ model: associatedModel, as, attributes });
            }
        }
    }
    return associations;
};

// Función para obtener las llaves foráneas
const getForeignKeys = (modelName) => {
    const model = db.models[modelName];
    const foreignKeys = [];

    if (model) {
        const attributes = model.getAttributes();
        for (const key in attributes) {
            if (attributes[key].references) {
                foreignKeys.push(key);
            }
        }
    }
    return foreignKeys;
};

// Función para crear el mapeo de filtros
const createFilterMappings = (associations) => {
    const mappings = associations.map(assoc => {
        const key = (assoc.as).split('_')[0];
        const value = `$${assoc.as}.${assoc.model.name === 'Users' ? 'Username' : 
            assoc.model.name === 'Municipio' ? 'CodigoMunicipio' :
            (assoc.attributes && assoc.attributes.length ? assoc.attributes[0] : '')}$`;
        return `${key}: '${value}'`;
    }).join(',\n    ');

    return `const filterMappings = {
    ${mappings}
};`;
};

// Función para crear el contenido del controlador
const createControllerContent = (modelName) => {
    const capitalizedModelName = modelName.charAt(0).toUpperCase() + modelName.slice(1);
    const associations = getAssociations(modelName);
    const foreignKeys = getForeignKeys(modelName);
    const filterMappings = createFilterMappings(associations);
    const modelAttributes = db.models[modelName].getAttributes();

    // Generar la lista de asociaciones en líneas separadas
    const includeAssociations = associations.map(assoc => {
        if (assoc.model.name === 'Users') {
            return `{ model: db.models["${assoc.model.name}"], attributes: ["Username"], as: "${assoc.as}" }`;
        } else if (assoc.attributes) {
            return `{ model: db.models["${assoc.model.name}"], attributes: ["${assoc.attributes.join('", "')}"], as: "${assoc.as}" }`;
        } else {
            return `{ model: db.models["${assoc.model.name}"], as: "${assoc.as}" }`;
        }
    }).join(',\n    ');

    const getFiltersMethod = db.models[modelName] && db.models[modelName].getAttributes()[modelName] ? `
    // Obtener el atributo '${modelName}' del modelo ${capitalizedModelName} para el
    getFilters: async () => {
        try {
            const attributes = await ${capitalizedModelName}.findAll({
                attributes: ['${modelName}', '${db.models[modelName].primaryKeyAttributes}']
            });
            return responseF({ status: 200, success: true, data: attributes });
        } catch (error) {
            console.error('Error en getFiltersMethod en el ${capitalizedModelName}Controller: ', error);
            return responseF({
                status: 500,
                success: false,
                message: 'Error interno al tratar de obtener el atributo ${modelName} del modelo ${capitalizedModelName}'
            });
        }
    },` : '';
    
    const nameFilterClause = modelName === 'Becario' ? `
            if (where?.NombreCompleto) {
                where = {
                    ...where,
                    [Op.and]: [
                        {
                            [Op.or]: filters.NombreCompleto.map(value => 
                                Sequelize.where(
                                    Sequelize.fn('concat', Sequelize.fn('LOWER', Sequelize.col('Becario.PrimerNombre')), ' ',
                                        Sequelize.fn('LOWER', Sequelize.col('Becario.SegundoNombre')), ' ',
                                        Sequelize.fn('LOWER', Sequelize.col('Becario.PrimerApellido')), ' ',
                                        Sequelize.fn('LOWER', Sequelize.col('Becario.SegundoApellido'))
                                    ),
                                    { [Op.like]: \`%\${value.toLowerCase()}\%\` }
                                )
                            )
                        }
                    ]
                };
                delete where.NombreCompleto; // Elimina el filtro NombreCompleto ya que se usa en la búsqueda personalizada
            }` : '';

    const municipioFilterClause = modelName === 'Municipio' ? `
            if (where?.Municipio) {
                where = {
                    ...where,
                    [Op.and]: [
                        {
                            [Op.or]: filters.Municipio.map(value => 
                                Sequelize.where(
                                    Sequelize.fn('LOWER', Sequelize.col('Municipio.Municipio')),
                                    { [Op.like]: \`%\${value.toLowerCase()}\%\` }
                                )
                            )
                        }
                    ]
                };
                delete where.Municipio; // Elimina el filtro Municipio ya que se usa en la búsqueda personalizada
            }` : '';

    const nameOrderClause = modelName === 'Becario' ? 
    `    if (orderField === 'NombreCompleto')
                order = [[Sequelize.literal("concat(LOWER(PrimerNombre), ' ', LOWER(SegundoNombre), ' ', LOWER(PrimerApellido), ' ', LOWER(SegundoApellido))"), orderType]];` : '';
        
    const foreignKeyOrderClause = associations.length ? associations.map((assoc, index) => {
        const attributeName = assoc.model.name === 'Users' ? 'Username' : (assoc.attributes ? assoc.attributes[0] : '');
        const clause = `
        ${index === 0 && !nameOrderClause ? '       if' : '        else if'} (orderField === '${assoc.as}')
                    order = [[{ model: db.models["${assoc.model.name}"], as: '${assoc.as}' }, '${attributeName}', orderType]];
        `;
        return clause;
    }).join('') : '';

    const completeOrderClause = 
`${nameOrderClause}
        ${foreignKeyOrderClause}
        ${nameOrderClause || foreignKeyOrderClause ? 
        '        else' : ''}
    ${nameOrderClause || foreignKeyOrderClause ?
    '               order = [[orderField, orderType]];' : '           order = [[orderField, orderType]];'
    }
`;

    return `//========================================
// Este archivo interactúa con la base de datos, específicamente con la tabla de ${capitalizedModelName}.
// Establece los métodos Get, getAll, Post, Put y Delete según sea necesario.
// IMPORTA:
//      'db': La clase db para la gestión de la base de datos.
//      '${capitalizedModelName}': Modelo con el que interactua
//      'responseF': Generador de respuestas
// EXPORTA: El controller de ${capitalizedModelName}
//========================================
const { Sequelize, Op } = require('sequelize');
const { db } = require('../../db/db.config');                       //Importa la instancia de db
const { ${capitalizedModelName} } = require('../../db/db.config');  //Importa el modelo ${capitalizedModelName}
const { responseF } = require('../../Helpers/responseF'); // Importa el creador de respuesta formato

const validateForeignKeys = async (foreignKeys) => {
    for (const [key, value] of Object.entries(foreignKeys)) {
        if (value) {
            const associatedModel = db.models[${capitalizedModelName}.getAttributes()[key].references.model];
            const associatedInstance = await associatedModel.findByPk(value);
            if (!associatedInstance) {
                return { error: true, field: key, value };
            }
        }
    };
};

const include = [
    ${includeAssociations}
]

const exclude = [
    ${foreignKeys.map(key => `"${key}"`).join(', ')}
]

${filterMappings}

// Controlador para el modelo ${capitalizedModelName}
const ${capitalizedModelName}Controller = {
    // Obtener los títulos de las columnas de ${capitalizedModelName}
    get: async () => {
        try {
            const attributes = Object.keys(${capitalizedModelName}.getAttributes());
            return responseF({ status: 200, success: true, data: attributes });
        } catch (error) {
            console.error('Error en get en el ${capitalizedModelName}Controller: ', error);
            return responseF({ status: 500, message: 'Error interno al tratar de obtener los títulos de las columnas', success: false });
        }
    },

    // Obtener un ${capitalizedModelName} por ID
        getById: async (id) => {
            try {
                const ${modelName.toLowerCase()} = await ${capitalizedModelName}.findByPk(id);
                if (!${modelName.toLowerCase()}) 
                    return responseF({ status: 404, message: '${capitalizedModelName} no encontrado.', success: false });

                return responseF({ status: 200, success: true, data: ${modelName.toLowerCase()} });
            } catch (error) {
                console.error('Error en getById en el ${capitalizedModelName}Controller: ' + id, error);
                return responseF({ status: 500, success: false, message: 'Error interno al tratar de obtener el ${capitalizedModelName}',
                });
            }
        },
    
    // Obtener todos los ${capitalizedModelName} o por filtros
    search: async (filters, pagination, orderField, orderType ) => {
        try {
            // Construir la cláusula where 
            let where = filters && Object.keys(filters).length ? { ...filters } : undefined;
            ${nameFilterClause}
            ${municipioFilterClause}
            for (const key in filters) {
                if (filterMappings[key]) {
                    where = {
                        ...where,
                        [Op.and]: [
                            ...(where[Op.and] || []),
                            {
                                [Op.or]: filters[key].map(value => ({ [filterMappings[key]] : value === "null" ? { [Op.is]: null } :
                                value === "notnull" ? { [Op.not]: null } : { [Op.like]: \`%\${value}%\` }
                                }))
                            }
                        ]
                    };
                    delete where[key]; // Elimina el filtro ya que se usa en la búsqueda personalizada
                }
            }

            //Construir pagination
            const page = pagination?.page;
            const pageSize = pagination?.pageSize;
            
            // Construir la cláusula de ordenamiento
            let order;
            if (orderField) {
            ${completeOrderClause}
            } else {
                order = undefined;
            }

            const searchResult = await ${capitalizedModelName}.findAndCountAll({
                where,
                limit: pagination ? pageSize : undefined,
                offset: pagination ? (page - 1) * pageSize : undefined,
                order,
                include, 
                attributes: { exclude }
            });

            return responseF({
                status: 200,
                success: true,
                data: {
                    rows: searchResult.rows,
                    count: searchResult.count
                }
            });
        } catch (error) {
            console.error('Error en Search en el ${capitalizedModelName}Controller: ', error);
            return responseF({ status: 500, success: false, message: \`Error interno al tratar de obtener \${filters ?\` ${capitalizedModelName} por filtro \`:\`todos los registros de ${capitalizedModelName}\`}\`});
        }
    },

    // Crear un nuevo ${capitalizedModelName}
    post: async ( newData${modelAttributes['InsertUserId'] ? ', InsertUserId' :''} ) => {
        try {
            const foreignKeyValidationResult = await validateForeignKeys(newData.foreignKeys);
            if (foreignKeyValidationResult?.error) {
                return responseF({ status: 400, success: false, message: 'Error de validación de llave foránea' });
            }

            const dataToCreate = { ...newData.regularFields, ...newData.foreignKeys${modelAttributes['InsertUserId'] ? ', InsertUserId' :''} };
            const created${capitalizedModelName} = await ${capitalizedModelName}.create(dataToCreate);

            return responseF({ status: 201, success: true, message:'Registro creado exitosamente', data: created${capitalizedModelName} });
        } catch (error) {
            console.error('Error en post en el ${capitalizedModelName}Controller: ', error);
            return responseF({ status: 500, message: 'Error interno al crear el ${capitalizedModelName}', success: false });
        }
    },

    // Actualizar un ${capitalizedModelName} por ID
    put: async ( id, newData${modelAttributes['UpdateUserId'] ? ', UpdateUserId' :''} ) => {
        try {
            const ${modelName.toLowerCase()} = await ${capitalizedModelName}.findByPk(id);
            if (!${modelName.toLowerCase()})
                return responseF({  status: 404,  success: false,  message: '${capitalizedModelName} no encontrado' });

            const foreignKeyValidationResult = await validateForeignKeys(newData.foreignKeys);
            if (foreignKeyValidationResult?.error)
                    return responseF({ status: 400, success: false, message: 'Error de validación de llave foránea' });

            // Agregar llaves foráneas a los campos regulares
            const dataToUpdate = { ...newData.regularFields, ...newData.foreignKeys${modelAttributes['UpdateUserId'] ? ', UpdateUserId' :''} };
            
            await ${modelName.toLowerCase()}.update(dataToUpdate);
            ${modelName === 'Becario' ?
            `
            if( ${modelName.toLowerCase()}.UserId ){
                const usuario = await db.models.Users.findOne({ where: { UserId: ${modelName.toLowerCase()}.UserId } });
                if (usuario) await usuario.update({Email: ${modelName.toLowerCase()}.CorreoElectronico });
            }
                `    
            :''}
            // Devolver el registro actualizado
            return responseF({ status: 200, success: true, message: '${capitalizedModelName} actualizado exitosamente', data: ${modelName.toLowerCase()} });
        } catch (error) {
            console.error('Error en Put en el ${capitalizedModelName}Controller: ', error);
            return responseF({ status: 500, success: false, message: \`Error en el servidor al actualizar el ${modelName.toLowerCase()} con id: \${id}\` });
        }
    },
    ${getFiltersMethod}
};

module.exports = ${capitalizedModelName}Controller;`
}

// Función para generar los controladores
const generateControllers = async () => {
    // Verificar si el directorio 'controllers' existe, si no existe, crearlo
    if (!fs.existsSync(controllersPath)) {
        fs.mkdirSync(controllersPath);
        console.log("Directorio 'controllers' creado exitosamente.");
    }

    // Iterar sobre todos los modelos
    for (const modelName in db.models) {
        const controllerContent = createControllerContent(modelName);
        const controllerFileName = path.resolve(controllersPath, `${modelName}.controller.js`);
        fs.writeFileSync(controllerFileName, controllerContent);
        console.log(`Controlador generado para el modelo '${modelName}' en '${controllerFileName}'`);
    }
};

generateControllers();
