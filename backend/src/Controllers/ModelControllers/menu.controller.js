//========================================
// Este archivo interactúa con la base de datos, específicamente con la tabla de menu.
// Establece los métodos Get, getAll, Post, Put y Delete según sea necesario.
// IMPORTA:
//      'db': La clase db para la gestión de la base de datos.
//      'menu': Modelo con el que interactua
//      'responseF': Generador de respuestas
// EXPORTA: El controller de menu
//========================================
const { Sequelize, Op } = require('sequelize');
const { db } = require('../../db/db.config');                       //Importa la instancia de db
const { menu } = require('../../db/db.config');  //Importa el modelo menu
const { responseF } = require('../../Helpers/responseF'); // Importa el creador de respuesta formato

const validateForeignKeys = async (foreignKeys) => {
    for (const [key, value] of Object.entries(foreignKeys)) {
        if (value) {
            const associatedModel = db.models[menu.getAttributes()[key].references.model];
            const associatedInstance = await associatedModel.findByPk(value);
            if (!associatedInstance) {
                return { error: true, field: key, value };
            }
        }
    };
};

const include = [
    { model: db.models["menu_type"], as: "menu_type" },
    { model: db.models["usuario"], as: "updated_by_usuario" }
]

const exclude = [
    "menu_type_id", "updated_by"
]

const filterMappings = {
    menu: '$menu_type.$',
    updated: '$updated_by_usuario.$'
};

// Controlador para el modelo menu
const menuController = {
    // Obtener los títulos de las columnas de menu
    get: async () => {
        try {
            const responseData = Object.keys(menu.getAttributes());
            return responseF({ status: 200, success: true, data: responseData });
        } catch (error) {
            console.error('Error en get en el menuController: ', error);
            return responseF({ status: 500, message: 'Error interno al tratar de obtener los títulos de las columnas', success: false });
        }
    },

    // Obtener un menu por ID
        getById: async (id) => {
            try {
                const responseData = await menu.findByPk(id);
                if (!menu) 
                    return responseF({ status: 404, message: 'menu no encontrado.', success: false });

                return responseF({ status: 200, success: true, data: responseData });
            } catch (error) {
                console.error('Error en getById en el menuController: ' + id, error);
                return responseF({ status: 500, success: false, message: 'Error interno al tratar de obtener el menu',
                });
            }
        },
    
    // Obtener todos los menu o por filtros
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
            
        
               if (orderField === 'menu_type')
                    order = [[{ model: db.models["menu_type"], as: 'menu_type' }, '', orderType]];
        
                else if (orderField === 'updated_by_usuario')
                    order = [[{ model: db.models["usuario"], as: 'updated_by_usuario' }, '', orderType]];
        
                else
                   order = [[orderField, orderType]];

            } else {
                order = undefined;
            }

            const searchResult = await menu.findAndCountAll({
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
            console.error('Error en Search en el menuController: ', error);
            return responseF({ status: 500, success: false, message: `Error interno al tratar de obtener ${filters ?` menu por filtro `:`todos los registros de menu`}`});
        }
    },

    // Crear un nuevo menu
    post: async ( newData ) => {
        try {
            const foreignKeyValidationResult = await validateForeignKeys(newData.foreignKeys);
            if (foreignKeyValidationResult?.error) {
                return responseF({ status: 400, success: false, message: 'Error de validación de llave foránea' });
            }

            const dataToCreate = { ...newData.regularFields, ...newData.foreignKeys };
            const createdmenu = await menu.create(dataToCreate);

            return responseF({ status: 201, success: true, message:'Registro creado exitosamente', data: createdmenu });
        } catch (error) {
            console.error('Error en post en el menuController: ', error);
            return responseF({ status: 500, message: 'Error interno al crear el menu', success: false });
        }
    },

    // Actualizar un menu por ID
    put: async ( id, newData ) => {
        try {
            const responseData = await menu.findByPk(id);
            if (!responseData)
                return responseF({  status: 404,  success: false,  message: 'menu no encontrado' });

            const foreignKeyValidationResult = await validateForeignKeys(newData.foreignKeys);
            if (foreignKeyValidationResult?.error)
                    return responseF({ status: 400, success: false, message: 'Error de validación de llave foránea' });

            // Agregar llaves foráneas a los campos regulares
            const dataToUpdate = { ...newData.regularFields, ...newData.foreignKeys };
            
            await responseData.update(dataToUpdate);
            
            // Devolver el registro actualizado
            return responseF({ status: 200, success: true, message: 'menu actualizado exitosamente', data: responseData });
        } catch (error) {
            console.error('Error en Put en el menuController: ', error);
            return responseF({ status: 500, success: false, message: `Error en el servidor al actualizar el menu con id: ${id}` });
        }
    },
    
};

module.exports = menuController;