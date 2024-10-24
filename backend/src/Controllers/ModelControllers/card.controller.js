//========================================
// Este archivo interactúa con la base de datos, específicamente con la tabla de card.
// Establece los métodos Get, getAll, Post, Put y Delete según sea necesario.
// IMPORTA:
//      'db': La clase db para la gestión de la base de datos.
//      'card': Modelo con el que interactua
//      'responseF': Generador de respuestas
// EXPORTA: El controller de card
//========================================
const { Sequelize, Op } = require('sequelize');
const { db } = require('../../db/db.config');                       //Importa la instancia de db
const { card } = require('../../db/db.config');  //Importa el modelo card
const { responseF } = require('../../Helpers/responseF'); // Importa el creador de respuesta formato

const validateForeignKeys = async (foreignKeys) => {
    for (const [key, value] of Object.entries(foreignKeys)) {
        if (value) {
            const associatedModel = db.models[card.getAttributes()[key].references.model];
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

// Controlador para el modelo card
const cardController = {
    // Obtener los títulos de las columnas de card
    get: async () => {
        try {
            const responseData = await card.findAndCountAll()
            // const responseData = Object.keys(card.getAttributes());
            return responseF({ status: 200, success: true, data: responseData });

        } catch (error) {
            console.error('Error en get en el cardController: ', error);
            return responseF({ status: 500, message: 'Error interno al tratar de obtener los títulos de las columnas', success: false });
        }
    },

    // Obtener un card por ID
    getById: async (id) => {
        try {
            const responseData = await card.findByPk(id);
            if (!card) 
                return responseF({ status: 404, message: 'card no encontrado.', success: false });

            return responseF({ status: 200, success: true, data: responseData });
        } catch (error) {
            console.error('Error en getById en el cardController: ' + id, error);
            return responseF({ status: 500, success: false, message: 'Error interno al tratar de obtener el card',
            });
        }
    },

    getByUserId: async (userId) => {
        try {
            const responseData = await card.findAll({
                where: { created_id: userId },
            });
    
            if (!responseData || responseData.length === 0) {
                return responseF({
                    status: 404,
                    message: 'No se encontraron cards para el user_id proporcionado.',
                    success: false,
                });
            }
    
            return responseF({
                status: 200,
                success: true,
                data: responseData,
            });
        } catch (error) {
            console.error('Error en getByMenuId en el cardController:', error);
            return responseF({
                status: 500,
                success: false,
                message: 'Error interno al tratar de obtener los cards por menu_id',
            });
        }
    },

    getByMenuId: async (menuId) => {
        try {
            const responseData = await card.findAll({
                where: { menu_id: menuId },
            });
    
            if (!responseData || responseData.length === 0) {
                return responseF({
                    status: 404,
                    message: 'No se encontraron cards para el menu_id proporcionado.',
                    success: false,
                });
            }
    
            return responseF({
                status: 200,
                success: true,
                data: responseData,
            });
        } catch (error) {
            console.error('Error en getByMenuId en el cardController:', error);
            return responseF({
                status: 500,
                success: false,
                message: 'Error interno al tratar de obtener los cards por menu_id',
            });
        }
    },
    
    // Obtener todos los card o por filtros
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

            const searchResult = await card.findAndCountAll({
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
            console.error('Error en Search en el cardController: ', error);
            return responseF({ status: 500, success: false, message: `Error interno al tratar de obtener ${filters ?` card por filtro `:`todos los registros de card`}`});
        }
    },

    // Crear un nuevo card
    post: async (newData) => {
        try {
            // Extraer los datos de newData en un objeto
            const dataToCreate = {
                menu_id: newData.menu_id,
                city_id: newData.city_id,
                order_no: newData.order_no,
                title: newData.title,
                image_url: newData.image_url,
                description: newData.description,
                home: newData.home,
                type: newData.type,
                card_group_id: newData.card_group_id,
                active: newData.active,
            };

            // Crear un nuevo registro en la tabla 'card'
            const createdCard = await card.create(dataToCreate);

            return responseF({
                status: 201,
                success: true,
                message: 'Registro creado exitosamente',
                data: createdCard,
            });
        } catch (error) {
            console.error('Error en post en el cardController:', error);
            return responseF({
                status: 500,
                message: 'Error interno al crear el card',
                success: false,
            });
        }
    },

    // Actualizar un card por ID
    put: async ( id, newData ) => {
        try {
            const responseData = await card.findByPk(id);
            if (!responseData)
                return responseF({  status: 404,  success: false,  message: 'card no encontrado' });

            const foreignKeyValidationResult = await validateForeignKeys(newData.foreignKeys);
            if (foreignKeyValidationResult?.error)
                    return responseF({ status: 400, success: false, message: 'Error de validación de llave foránea' });

            // Agregar llaves foráneas a los campos regulares
            const dataToUpdate = { ...newData.regularFields, ...newData.foreignKeys };
            
            await responseData.update(dataToUpdate);
            
            // Devolver el registro actualizado
            return responseF({ status: 200, success: true, message: 'card actualizado exitosamente', data: responseData });
        } catch (error) {
            console.error('Error en Put en el cardController: ', error);
            return responseF({ status: 500, success: false, message: `Error en el servidor al actualizar el card con id: ${id}` });
        }
    },
    
};

module.exports = cardController;