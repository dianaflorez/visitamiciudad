//========================================
// Este archivo interactúa con la base de datos, específicamente con la tabla de Card.
// Establece los métodos Get, getAll, Post, Put y Delete según sea necesario.
// IMPORTA:
//      'db': La clase db para la gestión de la base de datos.
//      'Card': Modelo con el que interactua
//      'responseF': Generador de respuestas
// EXPORTA: El controller de Card
//========================================
const { Sequelize, Op } = require('sequelize');
const { db } = require('../../db/db.config');                       //Importa la instancia de db
const { Card } = require('../../db/db.config');  //Importa el modelo Card
const { responseF } = require('../../Helpers/responseF'); // Importa el creador de respuesta formato

const validateForeignKeys = async (foreignKeys) => {
    for (const [key, value] of Object.entries(foreignKeys)) {
        if (value) {
            const associatedModel = db.models[Card.getAttributes()[key].references.model];
            const associatedInstance = await associatedModel.findByPk(value);
            if (!associatedInstance) {
                return { error: true, field: key, value };
            }
        }
    };
};

const include = [
    { model: db.models["card_group"], as: "card_group" },
    { model: db.models["city"], as: "city" },
    { model: db.models["menu"], as: "menu" },
    { model: db.models["usuario"], as: "created" },
    { model: db.models["usuario"], as: "updated_by_usuario" }
]

const exclude = [
    "menu_id", "created_id", "city_id", "card_group_id", "updated_by"
]

const filterMappings = {
    card: '$card_group.$',
    city: '$city.$',
    menu: '$menu.$',
    created: '$created.$',
    updated: '$updated_by_usuario.$'
};

// Controlador para el modelo Card
const CardController = {
    // Obtener los títulos de las columnas de Card
    get: async () => {
        try {
            const attributes = Object.keys(Card.getAttributes());
            return responseF({ status: 200, success: true, data: attributes });
        } catch (error) {
            console.error('Error en get en el CardController: ', error);
            return responseF({ status: 500, message: 'Error interno al tratar de obtener los títulos de las columnas', success: false });
        }
    },

    // Obtener un Card por ID
        getById: async (id) => {
            try {
                const card = await Card.findByPk(id);
                if (!card) 
                    return responseF({ status: 404, message: 'Card no encontrado.', success: false });

                return responseF({ status: 200, success: true, data: card });
            } catch (error) {
                console.error('Error en getById en el CardController: ' + id, error);
                return responseF({ status: 500, success: false, message: 'Error interno al tratar de obtener el Card',
                });
            }
        },
    
    // Obtener todos los Card o por filtros
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
            
        
               if (orderField === 'card_group')
                    order = [[{ model: db.models["card_group"], as: 'card_group' }, '', orderType]];
        
                else if (orderField === 'city')
                    order = [[{ model: db.models["city"], as: 'city' }, '', orderType]];
        
                else if (orderField === 'menu')
                    order = [[{ model: db.models["menu"], as: 'menu' }, '', orderType]];
        
                else if (orderField === 'created')
                    order = [[{ model: db.models["usuario"], as: 'created' }, '', orderType]];
        
                else if (orderField === 'updated_by_usuario')
                    order = [[{ model: db.models["usuario"], as: 'updated_by_usuario' }, '', orderType]];
        
                else
                   order = [[orderField, orderType]];

            } else {
                order = undefined;
            }

            const searchResult = await Card.findAndCountAll({
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
            console.error('Error en Search en el CardController: ', error);
            return responseF({ status: 500, success: false, message: `Error interno al tratar de obtener ${filters ?` Card por filtro `:`todos los registros de Card`}`});
        }
    },

    // Crear un nuevo Card
    post: async ( newData ) => {
        try {
            const foreignKeyValidationResult = await validateForeignKeys(newData.foreignKeys);
            if (foreignKeyValidationResult?.error) {
                return responseF({ status: 400, success: false, message: 'Error de validación de llave foránea' });
            }

            const dataToCreate = { ...newData.regularFields, ...newData.foreignKeys };
            const createdCard = await Card.create(dataToCreate);

            return responseF({ status: 201, success: true, message:'Registro creado exitosamente', data: createdCard });
        } catch (error) {
            console.error('Error en post en el CardController: ', error);
            return responseF({ status: 500, message: 'Error interno al crear el Card', success: false });
        }
    },

    // Actualizar un Card por ID
    put: async ( id, newData ) => {
        try {
            const card = await Card.findByPk(id);
            if (!card)
                return responseF({  status: 404,  success: false,  message: 'Card no encontrado' });

            const foreignKeyValidationResult = await validateForeignKeys(newData.foreignKeys);
            if (foreignKeyValidationResult?.error)
                    return responseF({ status: 400, success: false, message: 'Error de validación de llave foránea' });

            // Agregar llaves foráneas a los campos regulares
            const dataToUpdate = { ...newData.regularFields, ...newData.foreignKeys };
            
            await card.update(dataToUpdate);
            
            // Devolver el registro actualizado
            return responseF({ status: 200, success: true, message: 'Card actualizado exitosamente', data: card });
        } catch (error) {
            console.error('Error en Put en el CardController: ', error);
            return responseF({ status: 500, success: false, message: `Error en el servidor al actualizar el card con id: ${id}` });
        }
    },
    
};

module.exports = CardController;