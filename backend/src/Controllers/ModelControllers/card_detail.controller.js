//========================================
// Este archivo interactúa con la base de datos, específicamente con la tabla de Card_detail.
// Establece los métodos Get, getAll, Post, Put y Delete según sea necesario.
// IMPORTA:
//      'db': La clase db para la gestión de la base de datos.
//      'Card_detail': Modelo con el que interactua
//      'responseF': Generador de respuestas
// EXPORTA: El controller de Card_detail
//========================================
const { Sequelize, Op } = require('sequelize');
const { db } = require('../../db/db.config');                       //Importa la instancia de db
const { Card_detail } = require('../../db/db.config');  //Importa el modelo Card_detail
const { responseF } = require('../../Helpers/responseF'); // Importa el creador de respuesta formato

const validateForeignKeys = async (foreignKeys) => {
    for (const [key, value] of Object.entries(foreignKeys)) {
        if (value) {
            const associatedModel = db.models[Card_detail.getAttributes()[key].references.model];
            const associatedInstance = await associatedModel.findByPk(value);
            if (!associatedInstance) {
                return { error: true, field: key, value };
            }
        }
    };
};

const include = [
    { model: db.models["card"], as: "card" },
    { model: db.models["usuario"], as: "updated_by_usuario" }
]

const exclude = [
    "card_id", "updated_by"
]

const filterMappings = {
    card: '$card.$',
    updated: '$updated_by_usuario.$'
};

// Controlador para el modelo Card_detail
const Card_detailController = {
    // Obtener los títulos de las columnas de Card_detail
    get: async () => {
        try {
            const attributes = Object.keys(Card_detail.getAttributes());
            return responseF({ status: 200, success: true, data: attributes });
        } catch (error) {
            console.error('Error en get en el Card_detailController: ', error);
            return responseF({ status: 500, message: 'Error interno al tratar de obtener los títulos de las columnas', success: false });
        }
    },

    // Obtener un Card_detail por ID
        getById: async (id) => {
            try {
                const card_detail = await Card_detail.findByPk(id);
                if (!card_detail) 
                    return responseF({ status: 404, message: 'Card_detail no encontrado.', success: false });

                return responseF({ status: 200, success: true, data: card_detail });
            } catch (error) {
                console.error('Error en getById en el Card_detailController: ' + id, error);
                return responseF({ status: 500, success: false, message: 'Error interno al tratar de obtener el Card_detail',
                });
            }
        },
    
    // Obtener todos los Card_detail o por filtros
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
            
        
               if (orderField === 'card')
                    order = [[{ model: db.models["card"], as: 'card' }, '', orderType]];
        
                else if (orderField === 'updated_by_usuario')
                    order = [[{ model: db.models["usuario"], as: 'updated_by_usuario' }, '', orderType]];
        
                else
                   order = [[orderField, orderType]];

            } else {
                order = undefined;
            }

            const searchResult = await Card_detail.findAndCountAll({
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
            console.error('Error en Search en el Card_detailController: ', error);
            return responseF({ status: 500, success: false, message: `Error interno al tratar de obtener ${filters ?` Card_detail por filtro `:`todos los registros de Card_detail`}`});
        }
    },

    // Crear un nuevo Card_detail
    post: async ( newData ) => {
        try {
            const foreignKeyValidationResult = await validateForeignKeys(newData.foreignKeys);
            if (foreignKeyValidationResult?.error) {
                return responseF({ status: 400, success: false, message: 'Error de validación de llave foránea' });
            }

            const dataToCreate = { ...newData.regularFields, ...newData.foreignKeys };
            const createdCard_detail = await Card_detail.create(dataToCreate);

            return responseF({ status: 201, success: true, message:'Registro creado exitosamente', data: createdCard_detail });
        } catch (error) {
            console.error('Error en post en el Card_detailController: ', error);
            return responseF({ status: 500, message: 'Error interno al crear el Card_detail', success: false });
        }
    },

    // Actualizar un Card_detail por ID
    put: async ( id, newData ) => {
        try {
            const card_detail = await Card_detail.findByPk(id);
            if (!card_detail)
                return responseF({  status: 404,  success: false,  message: 'Card_detail no encontrado' });

            const foreignKeyValidationResult = await validateForeignKeys(newData.foreignKeys);
            if (foreignKeyValidationResult?.error)
                    return responseF({ status: 400, success: false, message: 'Error de validación de llave foránea' });

            // Agregar llaves foráneas a los campos regulares
            const dataToUpdate = { ...newData.regularFields, ...newData.foreignKeys };
            
            await card_detail.update(dataToUpdate);
            
            // Devolver el registro actualizado
            return responseF({ status: 200, success: true, message: 'Card_detail actualizado exitosamente', data: card_detail });
        } catch (error) {
            console.error('Error en Put en el Card_detailController: ', error);
            return responseF({ status: 500, success: false, message: `Error en el servidor al actualizar el card_detail con id: ${id}` });
        }
    },
    
};

module.exports = Card_detailController;