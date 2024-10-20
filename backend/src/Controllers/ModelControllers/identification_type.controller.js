//========================================
// Este archivo interactúa con la base de datos, específicamente con la tabla de Identification_type.
// Establece los métodos Get, getAll, Post, Put y Delete según sea necesario.
// IMPORTA:
//      'db': La clase db para la gestión de la base de datos.
//      'Identification_type': Modelo con el que interactua
//      'responseF': Generador de respuestas
// EXPORTA: El controller de Identification_type
//========================================
const { Sequelize, Op } = require('sequelize');
const { db } = require('../../db/db.config');                       //Importa la instancia de db
const { Identification_type } = require('../../db/db.config');  //Importa el modelo Identification_type
const { responseF } = require('../../Helpers/responseF'); // Importa el creador de respuesta formato

const validateForeignKeys = async (foreignKeys) => {
    for (const [key, value] of Object.entries(foreignKeys)) {
        if (value) {
            const associatedModel = db.models[Identification_type.getAttributes()[key].references.model];
            const associatedInstance = await associatedModel.findByPk(value);
            if (!associatedInstance) {
                return { error: true, field: key, value };
            }
        }
    };
};

const include = [
    
]

const exclude = [
    
]

const filterMappings = {
    
};

// Controlador para el modelo Identification_type
const Identification_typeController = {
    // Obtener los títulos de las columnas de Identification_type
    get: async () => {
        try {
            const attributes = Object.keys(Identification_type.getAttributes());
            return responseF({ status: 200, success: true, data: attributes });
        } catch (error) {
            console.error('Error en get en el Identification_typeController: ', error);
            return responseF({ status: 500, message: 'Error interno al tratar de obtener los títulos de las columnas', success: false });
        }
    },

    // Obtener un Identification_type por ID
        getById: async (id) => {
            try {
                const identification_type = await Identification_type.findByPk(id);
                if (!identification_type) 
                    return responseF({ status: 404, message: 'Identification_type no encontrado.', success: false });

                return responseF({ status: 200, success: true, data: identification_type });
            } catch (error) {
                console.error('Error en getById en el Identification_typeController: ' + id, error);
                return responseF({ status: 500, success: false, message: 'Error interno al tratar de obtener el Identification_type',
                });
            }
        },
    
    // Obtener todos los Identification_type o por filtros
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
            
        
        
               order = [[orderField, orderType]];

            } else {
                order = undefined;
            }

            const searchResult = await Identification_type.findAndCountAll({
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
            console.error('Error en Search en el Identification_typeController: ', error);
            return responseF({ status: 500, success: false, message: `Error interno al tratar de obtener ${filters ?` Identification_type por filtro `:`todos los registros de Identification_type`}`});
        }
    },

    // Crear un nuevo Identification_type
    post: async ( newData ) => {
        try {
            const foreignKeyValidationResult = await validateForeignKeys(newData.foreignKeys);
            if (foreignKeyValidationResult?.error) {
                return responseF({ status: 400, success: false, message: 'Error de validación de llave foránea' });
            }

            const dataToCreate = { ...newData.regularFields, ...newData.foreignKeys };
            const createdIdentification_type = await Identification_type.create(dataToCreate);

            return responseF({ status: 201, success: true, message:'Registro creado exitosamente', data: createdIdentification_type });
        } catch (error) {
            console.error('Error en post en el Identification_typeController: ', error);
            return responseF({ status: 500, message: 'Error interno al crear el Identification_type', success: false });
        }
    },

    // Actualizar un Identification_type por ID
    put: async ( id, newData ) => {
        try {
            const identification_type = await Identification_type.findByPk(id);
            if (!identification_type)
                return responseF({  status: 404,  success: false,  message: 'Identification_type no encontrado' });

            const foreignKeyValidationResult = await validateForeignKeys(newData.foreignKeys);
            if (foreignKeyValidationResult?.error)
                    return responseF({ status: 400, success: false, message: 'Error de validación de llave foránea' });

            // Agregar llaves foráneas a los campos regulares
            const dataToUpdate = { ...newData.regularFields, ...newData.foreignKeys };
            
            await identification_type.update(dataToUpdate);
            
            // Devolver el registro actualizado
            return responseF({ status: 200, success: true, message: 'Identification_type actualizado exitosamente', data: identification_type });
        } catch (error) {
            console.error('Error en Put en el Identification_typeController: ', error);
            return responseF({ status: 500, success: false, message: `Error en el servidor al actualizar el identification_type con id: ${id}` });
        }
    },
    
};

module.exports = Identification_typeController;