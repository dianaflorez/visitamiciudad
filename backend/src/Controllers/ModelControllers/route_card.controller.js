//========================================
// Este archivo interactúa con la base de datos, específicamente con la tabla de Route_card.
// Establece los métodos Get, getAll, Post, Put y Delete según sea necesario.
// IMPORTA:
//      'db': La clase db para la gestión de la base de datos.
//      'Route_card': Modelo con el que interactua
//      'responseF': Generador de respuestas
// EXPORTA: El controller de Route_card
//========================================
const { Sequelize, Op } = require('sequelize');
const { db } = require('../../db/db.config');                       //Importa la instancia de db
const { Route_card } = require('../../db/db.config');  //Importa el modelo Route_card
const { responseF } = require('../../Helpers/responseF'); // Importa el creador de respuesta formato

const validateForeignKeys = async (foreignKeys) => {
    for (const [key, value] of Object.entries(foreignKeys)) {
        if (value) {
            const associatedModel = db.models[Route_card.getAttributes()[key].references.model];
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

// Controlador para el modelo Route_card
const Route_cardController = {
    // Obtener los títulos de las columnas de Route_card
    get: async () => {
        try {
            const attributes = Object.keys(Route_card.getAttributes());
            return responseF({ status: 200, success: true, data: attributes });
        } catch (error) {
            console.error('Error en get en el Route_cardController: ', error);
            return responseF({ status: 500, message: 'Error interno al tratar de obtener los títulos de las columnas', success: false });
        }
    },

    // Obtener un Route_card por ID
        getById: async (id) => {
            try {
                const route_card = await Route_card.findByPk(id);
                if (!route_card) 
                    return responseF({ status: 404, message: 'Route_card no encontrado.', success: false });

                return responseF({ status: 200, success: true, data: route_card });
            } catch (error) {
                console.error('Error en getById en el Route_cardController: ' + id, error);
                return responseF({ status: 500, success: false, message: 'Error interno al tratar de obtener el Route_card',
                });
            }
        },
    
    // Obtener todos los Route_card o por filtros
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

            const searchResult = await Route_card.findAndCountAll({
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
            console.error('Error en Search en el Route_cardController: ', error);
            return responseF({ status: 500, success: false, message: `Error interno al tratar de obtener ${filters ?` Route_card por filtro `:`todos los registros de Route_card`}`});
        }
    },

    // Crear un nuevo Route_card
    post: async ( newData ) => {
        try {
            const foreignKeyValidationResult = await validateForeignKeys(newData.foreignKeys);
            if (foreignKeyValidationResult?.error) {
                return responseF({ status: 400, success: false, message: 'Error de validación de llave foránea' });
            }

            const dataToCreate = { ...newData.regularFields, ...newData.foreignKeys };
            const createdRoute_card = await Route_card.create(dataToCreate);

            return responseF({ status: 201, success: true, message:'Registro creado exitosamente', data: createdRoute_card });
        } catch (error) {
            console.error('Error en post en el Route_cardController: ', error);
            return responseF({ status: 500, message: 'Error interno al crear el Route_card', success: false });
        }
    },

    // Actualizar un Route_card por ID
    put: async ( id, newData ) => {
        try {
            const route_card = await Route_card.findByPk(id);
            if (!route_card)
                return responseF({  status: 404,  success: false,  message: 'Route_card no encontrado' });

            const foreignKeyValidationResult = await validateForeignKeys(newData.foreignKeys);
            if (foreignKeyValidationResult?.error)
                    return responseF({ status: 400, success: false, message: 'Error de validación de llave foránea' });

            // Agregar llaves foráneas a los campos regulares
            const dataToUpdate = { ...newData.regularFields, ...newData.foreignKeys };
            
            await route_card.update(dataToUpdate);
            
            // Devolver el registro actualizado
            return responseF({ status: 200, success: true, message: 'Route_card actualizado exitosamente', data: route_card });
        } catch (error) {
            console.error('Error en Put en el Route_cardController: ', error);
            return responseF({ status: 500, success: false, message: `Error en el servidor al actualizar el route_card con id: ${id}` });
        }
    },
    
};

module.exports = Route_cardController;