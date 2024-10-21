//========================================
// Este archivo interactúa con la base de datos, específicamente con la tabla de departamento.
// Establece los métodos Get, getAll, Post, Put y Delete según sea necesario.
// IMPORTA:
//      'db': La clase db para la gestión de la base de datos.
//      'departamento': Modelo con el que interactua
//      'responseF': Generador de respuestas
// EXPORTA: El controller de departamento
//========================================
const { Sequelize, Op } = require('sequelize');
const { db } = require('../../db/db.config');                       //Importa la instancia de db
const { departamento } = require('../../db/db.config');  //Importa el modelo departamento
const { responseF } = require('../../Helpers/responseF'); // Importa el creador de respuesta formato

const validateForeignKeys = async (foreignKeys) => {
    for (const [key, value] of Object.entries(foreignKeys)) {
        if (value) {
            const associatedModel = db.models[departamento.getAttributes()[key].references.model];
            const associatedInstance = await associatedModel.findByPk(value);
            if (!associatedInstance) {
                return { error: true, field: key, value };
            }
        }
    };
};

const include = [
    { model: db.models["country"], as: "cod_country_country" }
]

const exclude = [
    "cod_country"
]

const filterMappings = {
    cod: '$cod_country_country.$'
};

// Controlador para el modelo departamento
const departamentoController = {
    // Obtener los títulos de las columnas de departamento
    get: async () => {
        try {
            const responseData = Object.keys(departamento.getAttributes());
            return responseF({ status: 200, success: true, data: responseData });
        } catch (error) {
            console.error('Error en get en el departamentoController: ', error);
            return responseF({ status: 500, message: 'Error interno al tratar de obtener los títulos de las columnas', success: false });
        }
    },

    // Obtener un departamento por ID
        getById: async (id) => {
            try {
                const responseData = await departamento.findByPk(id);
                if (!departamento) 
                    return responseF({ status: 404, message: 'departamento no encontrado.', success: false });

                return responseF({ status: 200, success: true, data: responseData });
            } catch (error) {
                console.error('Error en getById en el departamentoController: ' + id, error);
                return responseF({ status: 500, success: false, message: 'Error interno al tratar de obtener el departamento',
                });
            }
        },
    
    // Obtener todos los departamento o por filtros
    search: async (filters, pagination, orderField, orderType ) => {
        try {
            // Construir la cláusula where 
            let where = filters && Object.keys(filters).length ? { ...filters } : undefined;
            
            
            for (const key in filters) {
                if (filterMappings[key]) {
                    where = {
                        ...where,
                        [Op.and]: [
                            ...(where[Op.and] || []),
                            {
                                [Op.or]: filters[key].map(value => ({ [filterMappings[key]] : value === "null" ? { [Op.is]: null } :
                                value === "notnull" ? { [Op.not]: null } : { [Op.like]: `%${value}%` }
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
            
        
               if (orderField === 'cod_country_country')
                    order = [[{ model: db.models["country"], as: 'cod_country_country' }, '', orderType]];
        
                else
                   order = [[orderField, orderType]];

            } else {
                order = undefined;
            }

            const searchResult = await departamento.findAndCountAll({
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
            console.error('Error en Search en el departamentoController: ', error);
            return responseF({ status: 500, success: false, message: `Error interno al tratar de obtener ${filters ?` departamento por filtro `:`todos los registros de departamento`}`});
        }
    },

    // Crear un nuevo departamento
    post: async ( newData ) => {
        try {
            const foreignKeyValidationResult = await validateForeignKeys(newData.foreignKeys);
            if (foreignKeyValidationResult?.error) {
                return responseF({ status: 400, success: false, message: 'Error de validación de llave foránea' });
            }

            const dataToCreate = { ...newData.regularFields, ...newData.foreignKeys };
            const createddepartamento = await departamento.create(dataToCreate);

            return responseF({ status: 201, success: true, message:'Registro creado exitosamente', data: createddepartamento });
        } catch (error) {
            console.error('Error en post en el departamentoController: ', error);
            return responseF({ status: 500, message: 'Error interno al crear el departamento', success: false });
        }
    },

    // Actualizar un departamento por ID
    put: async ( id, newData ) => {
        try {
            const responseData = await departamento.findByPk(id);
            if (!responseData)
                return responseF({  status: 404,  success: false,  message: 'departamento no encontrado' });

            const foreignKeyValidationResult = await validateForeignKeys(newData.foreignKeys);
            if (foreignKeyValidationResult?.error)
                    return responseF({ status: 400, success: false, message: 'Error de validación de llave foránea' });

            // Agregar llaves foráneas a los campos regulares
            const dataToUpdate = { ...newData.regularFields, ...newData.foreignKeys };
            
            await responseData.update(dataToUpdate);
            
            // Devolver el registro actualizado
            return responseF({ status: 200, success: true, message: 'departamento actualizado exitosamente', data: responseData });
        } catch (error) {
            console.error('Error en Put en el departamentoController: ', error);
            return responseF({ status: 500, success: false, message: `Error en el servidor al actualizar el departamento con id: ${id}` });
        }
    },
    
};

module.exports = departamentoController;