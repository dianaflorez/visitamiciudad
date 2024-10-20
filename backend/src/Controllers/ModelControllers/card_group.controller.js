//========================================
// Este archivo interactúa con la base de datos, específicamente con la tabla de Card_group.
// Establece los métodos Get, getAll, Post, Put y Delete según sea necesario.
// IMPORTA:
//      'db': La clase db para la gestión de la base de datos.
//      'Card_group': Modelo con el que interactua
//      'responseF': Generador de respuestas
// EXPORTA: El controller de Card_group
//========================================
const { Sequelize, Op } = require('sequelize');
const { db } = require('../../db/db.config');                       //Importa la instancia de db
const { Card_group } = require('../../db/db.config');  //Importa el modelo Card_group
const { responseF } = require('../../Helpers/responseF'); // Importa el creador de respuesta formato

const validateForeignKeys = async (foreignKeys) => {
    for (const [key, value] of Object.entries(foreignKeys)) {
        if (value) {
            const associatedModel = db.models[Card_group.getAttributes()[key].references.model];
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

// Controlador para el modelo Card_group
const Card_groupController = {
    // Obtener los títulos de las columnas de Card_group
    get: async () => {
        try {
            const attributes = Object.keys(Card_group.getAttributes());
            return responseF({ status: 200, success: true, data: attributes });
        } catch (error) {
            console.error('Error en get en el Card_groupController: ', error);
            return responseF({ status: 500, message: 'Error interno al tratar de obtener los títulos de las columnas', success: false });
        }
    },

    // Obtener un Card_group por ID
        getById: async (id) => {
            try {
                const card_group = await Card_group.findByPk(id);
                if (!card_group) 
                    return responseF({ status: 404, message: 'Card_group no encontrado.', success: false });

                return responseF({ status: 200, success: true, data: card_group });
            } catch (error) {
                console.error('Error en getById en el Card_groupController: ' + id, error);
                return responseF({ status: 500, success: false, message: 'Error interno al tratar de obtener el Card_group',
                });
            }
        },
    
    // Obtener todos los Card_group o por filtros
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

            const searchResult = await Card_group.findAndCountAll({
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
            console.error('Error en Search en el Card_groupController: ', error);
            return responseF({ status: 500, success: false, message: `Error interno al tratar de obtener ${filters ?` Card_group por filtro `:`todos los registros de Card_group`}`});
        }
    },

    // Crear un nuevo Card_group
    post: async ( newData ) => {
        try {
            const foreignKeyValidationResult = await validateForeignKeys(newData.foreignKeys);
            if (foreignKeyValidationResult?.error) {
                return responseF({ status: 400, success: false, message: 'Error de validación de llave foránea' });
            }

            const dataToCreate = { ...newData.regularFields, ...newData.foreignKeys };
            const createdCard_group = await Card_group.create(dataToCreate);

            return responseF({ status: 201, success: true, message:'Registro creado exitosamente', data: createdCard_group });
        } catch (error) {
            console.error('Error en post en el Card_groupController: ', error);
            return responseF({ status: 500, message: 'Error interno al crear el Card_group', success: false });
        }
    },

    // Actualizar un Card_group por ID
    put: async ( id, newData ) => {
        try {
            const card_group = await Card_group.findByPk(id);
            if (!card_group)
                return responseF({  status: 404,  success: false,  message: 'Card_group no encontrado' });

            const foreignKeyValidationResult = await validateForeignKeys(newData.foreignKeys);
            if (foreignKeyValidationResult?.error)
                    return responseF({ status: 400, success: false, message: 'Error de validación de llave foránea' });

            // Agregar llaves foráneas a los campos regulares
            const dataToUpdate = { ...newData.regularFields, ...newData.foreignKeys };
            
            await card_group.update(dataToUpdate);
            
            // Devolver el registro actualizado
            return responseF({ status: 200, success: true, message: 'Card_group actualizado exitosamente', data: card_group });
        } catch (error) {
            console.error('Error en Put en el Card_groupController: ', error);
            return responseF({ status: 500, success: false, message: `Error en el servidor al actualizar el card_group con id: ${id}` });
        }
    },
    
};

module.exports = Card_groupController;