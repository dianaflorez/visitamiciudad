//========================================
// Este archivo interactúa con la base de datos, específicamente con la tabla de route_card.
// Establece los métodos Get, getAll, Post, Put y Delete según sea necesario.
// IMPORTA:
//      'db': La clase db para la gestión de la base de datos.
//      'route_card': Modelo con el que interactua
//      'responseF': Generador de respuestas
// EXPORTA: El controller de route_card
//========================================
const { Sequelize, Op } = require('sequelize');
const { db } = require('../../db/db.config');                       //Importa la instancia de db
const { route_card } = require('../../db/db.config');  //Importa el modelo route_card
const { responseF } = require('../../Helpers/responseF'); // Importa el creador de respuesta formato

const validateForeignKeys = async (foreignKeys) => {
    for (const [key, value] of Object.entries(foreignKeys)) {
        if (value) {
            const associatedModel = db.models[route_card.getAttributes()[key].references.model];
            const associatedInstance = await associatedModel.findByPk(value);
            if (!associatedInstance) {
                return { error: true, field: key, value };
            }
        }
    };
};

const include = [
    { model: db.models["card"], as: "card" },
    { model: db.models["route"], as: "route" },
    { model: db.models["usuario"], as: "updated_by_usuario" }
]

const exclude = [
    "route_id", "card_id", "updated_by"
]

const filterMappings = {
    card: '$card.$',
    route: '$route.$',
    updated: '$updated_by_usuario.$'
};

// Controlador para el modelo route_card
const route_cardController = {
    // Obtener los títulos de las columnas de route_card
    get: async () => {
        try {
            const responseData = Object.keys(route_card.getAttributes());
            return responseF({ status: 200, success: true, data: responseData });
        } catch (error) {
            console.error('Error en get en el route_cardController: ', error);
            return responseF({ status: 500, message: 'Error interno al tratar de obtener los títulos de las columnas', success: false });
        }
    },

    // Obtener un route_card por ID
        getById: async (id) => {
            try {
                const responseData = await route_card.findByPk(id);
                if (!route_card) 
                    return responseF({ status: 404, message: 'route_card no encontrado.', success: false });

                return responseF({ status: 200, success: true, data: responseData });
            } catch (error) {
                console.error('Error en getById en el route_cardController: ' + id, error);
                return responseF({ status: 500, success: false, message: 'Error interno al tratar de obtener el route_card',
                });
            }
        },
    
    // Obtener todos los route_card o por filtros
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
        
                else if (orderField === 'route')
                    order = [[{ model: db.models["route"], as: 'route' }, '', orderType]];
        
                else if (orderField === 'updated_by_usuario')
                    order = [[{ model: db.models["usuario"], as: 'updated_by_usuario' }, '', orderType]];
        
                else
                   order = [[orderField, orderType]];

            } else {
                order = undefined;
            }

            const searchResult = await route_card.findAndCountAll({
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
            console.error('Error en Search en el route_cardController: ', error);
            return responseF({ status: 500, success: false, message: `Error interno al tratar de obtener ${filters ?` route_card por filtro `:`todos los registros de route_card`}`});
        }
    },

    // Crear un nuevo route_card
    post: async ( newData ) => {
        try {
            const foreignKeyValidationResult = await validateForeignKeys(newData.foreignKeys);
            if (foreignKeyValidationResult?.error) {
                return responseF({ status: 400, success: false, message: 'Error de validación de llave foránea' });
            }

            const dataToCreate = { ...newData.regularFields, ...newData.foreignKeys };
            const createdroute_card = await route_card.create(dataToCreate);

            return responseF({ status: 201, success: true, message:'Registro creado exitosamente', data: createdroute_card });
        } catch (error) {
            console.error('Error en post en el route_cardController: ', error);
            return responseF({ status: 500, message: 'Error interno al crear el route_card', success: false });
        }
    },

    // Actualizar un route_card por ID
    put: async ( id, newData ) => {
        try {
            const responseData = await route_card.findByPk(id);
            if (!responseData)
                return responseF({  status: 404,  success: false,  message: 'route_card no encontrado' });

            const foreignKeyValidationResult = await validateForeignKeys(newData.foreignKeys);
            if (foreignKeyValidationResult?.error)
                    return responseF({ status: 400, success: false, message: 'Error de validación de llave foránea' });

            // Agregar llaves foráneas a los campos regulares
            const dataToUpdate = { ...newData.regularFields, ...newData.foreignKeys };
            
            await responseData.update(dataToUpdate);
            
            // Devolver el registro actualizado
            return responseF({ status: 200, success: true, message: 'route_card actualizado exitosamente', data: responseData });
        } catch (error) {
            console.error('Error en Put en el route_cardController: ', error);
            return responseF({ status: 500, success: false, message: `Error en el servidor al actualizar el route_card con id: ${id}` });
        }
    },
    
};

module.exports = route_cardController;