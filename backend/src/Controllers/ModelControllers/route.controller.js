//========================================
// Este archivo interactúa con la base de datos, específicamente con la tabla de route.
// Establece los métodos Get, getAll, Post, Put y Delete según sea necesario.
// IMPORTA:
//      'db': La clase db para la gestión de la base de datos.
//      'route': Modelo con el que interactua
//      'responseF': Generador de respuestas
// EXPORTA: El controller de route
//========================================
const { Sequelize, Op } = require('sequelize');
const { db } = require('../../db/db.config');                       //Importa la instancia de db
const { route } = require('../../db/db.config');  //Importa el modelo route
const { responseF } = require('../../Helpers/responseF'); // Importa el creador de respuesta formato

const validateForeignKeys = async (foreignKeys) => {
    for (const [key, value] of Object.entries(foreignKeys)) {
        if (value) {
            const associatedModel = db.models[route.getAttributes()[key].references.model];
            const associatedInstance = await associatedModel.findByPk(value);
            if (!associatedInstance) {
                return { error: true, field: key, value };
            }
        }
    };
};

const include = [
    { model: db.models["person_type"], as: "person_type" },
    { model: db.models["usuario"], as: "created" },
    { model: db.models["usuario"], as: "updated_by_usuario" }
]

const exclude = [
    "created_id", "person_type_id", "updated_by"
]

const filterMappings = {
    person: '$person_type.$',
    created: '$created.$',
    updated: '$updated_by_usuario.$'
};

// Controlador para el modelo route
const routeController = {
    // Obtener los títulos de las columnas de route
    get: async () => {
        try {
            const responseData = Object.keys(route.getAttributes());
            return responseF({ status: 200, success: true, data: responseData });
        } catch (error) {
            console.error('Error en get en el routeController: ', error);
            return responseF({ status: 500, message: 'Error interno al tratar de obtener los títulos de las columnas', success: false });
        }
    },

    // Obtener un route por ID
        getById: async (id) => {
            try {
                const responseData = await route.findByPk(id);
                if (!route) 
                    return responseF({ status: 404, message: 'route no encontrado.', success: false });

                return responseF({ status: 200, success: true, data: responseData });
            } catch (error) {
                console.error('Error en getById en el routeController: ' + id, error);
                return responseF({ status: 500, success: false, message: 'Error interno al tratar de obtener el route',
                });
            }
        },
    
    // Obtener todos los route o por filtros
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
            
        
               if (orderField === 'person_type')
                    order = [[{ model: db.models["person_type"], as: 'person_type' }, '', orderType]];
        
                else if (orderField === 'created')
                    order = [[{ model: db.models["usuario"], as: 'created' }, '', orderType]];
        
                else if (orderField === 'updated_by_usuario')
                    order = [[{ model: db.models["usuario"], as: 'updated_by_usuario' }, '', orderType]];
        
                else
                   order = [[orderField, orderType]];

            } else {
                order = undefined;
            }

            const searchResult = await route.findAndCountAll({
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
            console.error('Error en Search en el routeController: ', error);
            return responseF({ status: 500, success: false, message: `Error interno al tratar de obtener ${filters ?` route por filtro `:`todos los registros de route`}`});
        }
    },

    // Crear un nuevo route
    post: async ( newData ) => {
        try {
            const foreignKeyValidationResult = await validateForeignKeys(newData.foreignKeys);
            if (foreignKeyValidationResult?.error) {
                return responseF({ status: 400, success: false, message: 'Error de validación de llave foránea' });
            }

            const dataToCreate = { ...newData.regularFields, ...newData.foreignKeys };
            const createdroute = await route.create(dataToCreate);

            return responseF({ status: 201, success: true, message:'Registro creado exitosamente', data: createdroute });
        } catch (error) {
            console.error('Error en post en el routeController: ', error);
            return responseF({ status: 500, message: 'Error interno al crear el route', success: false });
        }
    },

    // Actualizar un route por ID
    put: async ( id, newData ) => {
        try {
            const responseData = await route.findByPk(id);
            if (!responseData)
                return responseF({  status: 404,  success: false,  message: 'route no encontrado' });

            const foreignKeyValidationResult = await validateForeignKeys(newData.foreignKeys);
            if (foreignKeyValidationResult?.error)
                    return responseF({ status: 400, success: false, message: 'Error de validación de llave foránea' });

            // Agregar llaves foráneas a los campos regulares
            const dataToUpdate = { ...newData.regularFields, ...newData.foreignKeys };
            
            await responseData.update(dataToUpdate);
            
            // Devolver el registro actualizado
            return responseF({ status: 200, success: true, message: 'route actualizado exitosamente', data: responseData });
        } catch (error) {
            console.error('Error en Put en el routeController: ', error);
            return responseF({ status: 500, success: false, message: `Error en el servidor al actualizar el route con id: ${id}` });
        }
    },
    
};

module.exports = routeController;