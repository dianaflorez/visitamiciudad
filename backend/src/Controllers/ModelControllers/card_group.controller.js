//========================================
// Este archivo interactúa con la base de datos, específicamente con la tabla de card_group.
// Establece los métodos Get, getAll, Post, Put y Delete según sea necesario.
// IMPORTA:
//      'db': La clase db para la gestión de la base de datos.
//      'card_group': Modelo con el que interactua
//      'responseF': Generador de respuestas
// EXPORTA: El controller de card_group
//========================================
const { Sequelize, Op } = require('sequelize');
const { db } = require('../../db/db.config');                       //Importa la instancia de db
const { card_group } = require('../../db/db.config');  //Importa el modelo card_group
const { responseF } = require('../../Helpers/responseF'); // Importa el creador de respuesta formato

const validateForeignKeys = async (foreignKeys) => {
    for (const [key, value] of Object.entries(foreignKeys)) {
        if (value) {
            const associatedModel = db.models[card_group.getAttributes()[key].references.model];
            const associatedInstance = await associatedModel.findByPk(value);
            if (!associatedInstance) {
                return { error: true, field: key, value };
            }
        }
    };
};

const include = [
    { model: db.models["usuario"], as: "updated_by_usuario" }
]

const exclude = [
    "updated_by"
]

const filterMappings = {
    updated: '$updated_by_usuario.$'
};

// Controlador para el modelo card_group
const card_groupController = {
    // Obtener los títulos de las columnas de card_group
    get: async () => {
        try {
            const responseData = card_group.findAndCountAll()
            // const responseData = Object.keys(card_group.getAttributes());
            return responseF({ status: 200, success: true, data: responseData });
        } catch (error) {
            console.error('Error en get en el card_groupController: ', error);
            return responseF({ status: 500, message: 'Error interno al tratar de obtener los títulos de las columnas', success: false });
        }
    },

    // Obtener un card_group por ID
        getById: async (id) => {
            try {
                const responseData = await card_group.findByPk(id);
                if (!card_group) 
                    return responseF({ status: 404, message: 'card_group no encontrado.', success: false });

                return responseF({ status: 200, success: true, data: responseData });
            } catch (error) {
                console.error('Error en getById en el card_groupController: ' + id, error);
                return responseF({ status: 500, success: false, message: 'Error interno al tratar de obtener el card_group',
                });
            }
        },
    
    // Obtener todos los card_group o por filtros
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
            
        
               if (orderField === 'updated_by_usuario')
                    order = [[{ model: db.models["usuario"], as: 'updated_by_usuario' }, '', orderType]];
        
                else
                   order = [[orderField, orderType]];

            } else {
                order = undefined;
            }

            const searchResult = await card_group.findAndCountAll({
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
            console.error('Error en Search en el card_groupController: ', error);
            return responseF({ status: 500, success: false, message: `Error interno al tratar de obtener ${filters ?` card_group por filtro `:`todos los registros de card_group`}`});
        }
    },

    // Crear un nuevo card_group
    post: async ( newData ) => {
        try {
            const foreignKeyValidationResult = await validateForeignKeys(newData.foreignKeys);
            if (foreignKeyValidationResult?.error) {
                return responseF({ status: 400, success: false, message: 'Error de validación de llave foránea' });
            }

            const dataToCreate = { ...newData.regularFields, ...newData.foreignKeys };
            const createdcard_group = await card_group.create(dataToCreate);

            return responseF({ status: 201, success: true, message:'Registro creado exitosamente', data: createdcard_group });
        } catch (error) {
            console.error('Error en post en el card_groupController: ', error);
            return responseF({ status: 500, message: 'Error interno al crear el card_group', success: false });
        }
    },

    // Actualizar un card_group por ID
    put: async ( id, newData ) => {
        try {
            const responseData = await card_group.findByPk(id);
            if (!responseData)
                return responseF({  status: 404,  success: false,  message: 'card_group no encontrado' });

            const foreignKeyValidationResult = await validateForeignKeys(newData.foreignKeys);
            if (foreignKeyValidationResult?.error)
                    return responseF({ status: 400, success: false, message: 'Error de validación de llave foránea' });

            // Agregar llaves foráneas a los campos regulares
            const dataToUpdate = { ...newData.regularFields, ...newData.foreignKeys };
            
            await responseData.update(dataToUpdate);
            
            // Devolver el registro actualizado
            return responseF({ status: 200, success: true, message: 'card_group actualizado exitosamente', data: responseData });
        } catch (error) {
            console.error('Error en Put en el card_groupController: ', error);
            return responseF({ status: 500, success: false, message: `Error en el servidor al actualizar el card_group con id: ${id}` });
        }
    },
    
};

module.exports = card_groupController;