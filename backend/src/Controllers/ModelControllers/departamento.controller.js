//========================================
// Este archivo interactúa con la base de datos, específicamente con la tabla de Departamento.
// Establece los métodos Get, getAll, Post, Put y Delete según sea necesario.
// IMPORTA:
//      'db': La clase db para la gestión de la base de datos.
//      'Departamento': Modelo con el que interactua
//      'responseF': Generador de respuestas
// EXPORTA: El controller de Departamento
//========================================
const { Sequelize, Op } = require('sequelize');
const { db } = require('../../db/db.config');                       //Importa la instancia de db
const { Departamento } = require('../../db/db.config');  //Importa el modelo Departamento
const { responseF } = require('../../Helpers/responseF'); // Importa el creador de respuesta formato

const validateForeignKeys = async (foreignKeys) => {
    for (const [key, value] of Object.entries(foreignKeys)) {
        if (value) {
            const associatedModel = db.models[Departamento.getAttributes()[key].references.model];
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

// Controlador para el modelo Departamento
const DepartamentoController = {
    // Obtener los títulos de las columnas de Departamento
    get: async () => {
        try {
            const attributes = Object.keys(Departamento.getAttributes());
            return responseF({ status: 200, success: true, data: attributes });
        } catch (error) {
            console.error('Error en get en el DepartamentoController: ', error);
            return responseF({ status: 500, message: 'Error interno al tratar de obtener los títulos de las columnas', success: false });
        }
    },

    // Obtener un Departamento por ID
        getById: async (id) => {
            try {
                const departamento = await Departamento.findByPk(id);
                if (!departamento) 
                    return responseF({ status: 404, message: 'Departamento no encontrado.', success: false });

                return responseF({ status: 200, success: true, data: departamento });
            } catch (error) {
                console.error('Error en getById en el DepartamentoController: ' + id, error);
                return responseF({ status: 500, success: false, message: 'Error interno al tratar de obtener el Departamento',
                });
            }
        },
    
    // Obtener todos los Departamento o por filtros
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

            const searchResult = await Departamento.findAndCountAll({
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
            console.error('Error en Search en el DepartamentoController: ', error);
            return responseF({ status: 500, success: false, message: `Error interno al tratar de obtener ${filters ?` Departamento por filtro `:`todos los registros de Departamento`}`});
        }
    },

    // Crear un nuevo Departamento
    post: async ( newData ) => {
        try {
            const foreignKeyValidationResult = await validateForeignKeys(newData.foreignKeys);
            if (foreignKeyValidationResult?.error) {
                return responseF({ status: 400, success: false, message: 'Error de validación de llave foránea' });
            }

            const dataToCreate = { ...newData.regularFields, ...newData.foreignKeys };
            const createdDepartamento = await Departamento.create(dataToCreate);

            return responseF({ status: 201, success: true, message:'Registro creado exitosamente', data: createdDepartamento });
        } catch (error) {
            console.error('Error en post en el DepartamentoController: ', error);
            return responseF({ status: 500, message: 'Error interno al crear el Departamento', success: false });
        }
    },

    // Actualizar un Departamento por ID
    put: async ( id, newData ) => {
        try {
            const departamento = await Departamento.findByPk(id);
            if (!departamento)
                return responseF({  status: 404,  success: false,  message: 'Departamento no encontrado' });

            const foreignKeyValidationResult = await validateForeignKeys(newData.foreignKeys);
            if (foreignKeyValidationResult?.error)
                    return responseF({ status: 400, success: false, message: 'Error de validación de llave foránea' });

            // Agregar llaves foráneas a los campos regulares
            const dataToUpdate = { ...newData.regularFields, ...newData.foreignKeys };
            
            await departamento.update(dataToUpdate);
            
            // Devolver el registro actualizado
            return responseF({ status: 200, success: true, message: 'Departamento actualizado exitosamente', data: departamento });
        } catch (error) {
            console.error('Error en Put en el DepartamentoController: ', error);
            return responseF({ status: 500, success: false, message: `Error en el servidor al actualizar el departamento con id: ${id}` });
        }
    },
    
};

module.exports = DepartamentoController;