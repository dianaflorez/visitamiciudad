//========================================
// Este archivo interactúa con la base de datos, específicamente con la tabla de usuario.
// Establece los métodos Get, getAll, Post, Put y Delete según sea necesario.
// IMPORTA:
//      'db': La clase db para la gestión de la base de datos.
//      'usuario': Modelo con el que interactua
//      'responseF': Generador de respuestas
// EXPORTA: El controller de usuario
//========================================
const { Sequelize, Op } = require('sequelize');
const { db } = require('../../db/db.config');                       //Importa la instancia de db
const { usuario } = require('../../db/db.config');  //Importa el modelo usuario
const { responseF } = require('../../Helpers/responseF'); // Importa el creador de respuesta formato

const validateForeignKeys = async (foreignKeys) => {
    for (const [key, value] of Object.entries(foreignKeys)) {
        if (value) {
            const associatedModel = db.models[usuario.getAttributes()[key].references.model];
            const associatedInstance = await associatedModel.findByPk(value);
            if (!associatedInstance) {
                return { error: true, field: key, value };
            }
        }
    };
};

const include = [
    { model: db.models["identification_type"], as: "identification_type" },
    { model: db.models["role"], as: "role" }
]

const exclude = [
    "identification_type_id", "role_id"
]

const filterMappings = {
    identification: '$identification_type.$',
    role: '$role.$'
};

// Controlador para el modelo usuario
const usuarioController = {
    // Obtener los títulos de las columnas de usuario
    get: async () => {
        try {
            const responseData = Object.keys(usuario.getAttributes());
            return responseF({ status: 200, success: true, data: responseData });
        } catch (error) {
            console.error('Error en get en el usuarioController: ', error);
            return responseF({ status: 500, message: 'Error interno al tratar de obtener los títulos de las columnas', success: false });
        }
    },

    // Obtener un usuario por ID
        getById: async (id) => {
            try {
                const responseData = await usuario.findByPk(id);
                if (!usuario) 
                    return responseF({ status: 404, message: 'usuario no encontrado.', success: false });

                return responseF({ status: 200, success: true, data: responseData });
            } catch (error) {
                console.error('Error en getById en el usuarioController: ' + id, error);
                return responseF({ status: 500, success: false, message: 'Error interno al tratar de obtener el usuario',
                });
            }
        },
    
    // Obtener todos los usuario o por filtros
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
            
        
               if (orderField === 'identification_type')
                    order = [[{ model: db.models["identification_type"], as: 'identification_type' }, '', orderType]];
        
                else if (orderField === 'role')
                    order = [[{ model: db.models["role"], as: 'role' }, '', orderType]];
        
                else
                   order = [[orderField, orderType]];

            } else {
                order = undefined;
            }

            const searchResult = await usuario.findAndCountAll({
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
            console.error('Error en Search en el usuarioController: ', error);
            return responseF({ status: 500, success: false, message: `Error interno al tratar de obtener ${filters ?` usuario por filtro `:`todos los registros de usuario`}`});
        }
    },

    // Crear un nuevo usuario
    post: async ( newData ) => {
        try {
            const foreignKeyValidationResult = await validateForeignKeys(newData.foreignKeys);
            if (foreignKeyValidationResult?.error) {
                return responseF({ status: 400, success: false, message: 'Error de validación de llave foránea' });
            }

            const dataToCreate = { ...newData.regularFields, ...newData.foreignKeys };
            const createdusuario = await usuario.create(dataToCreate);

            return responseF({ status: 201, success: true, message:'Registro creado exitosamente', data: createdusuario });
        } catch (error) {
            console.error('Error en post en el usuarioController: ', error);
            return responseF({ status: 500, message: 'Error interno al crear el usuario', success: false });
        }
    },

    // Actualizar un usuario por ID
    put: async ( id, newData ) => {
        try {
            const responseData = await usuario.findByPk(id);
            if (!responseData)
                return responseF({  status: 404,  success: false,  message: 'usuario no encontrado' });

            const foreignKeyValidationResult = await validateForeignKeys(newData.foreignKeys);
            if (foreignKeyValidationResult?.error)
                    return responseF({ status: 400, success: false, message: 'Error de validación de llave foránea' });

            // Agregar llaves foráneas a los campos regulares
            const dataToUpdate = { ...newData.regularFields, ...newData.foreignKeys };
            
            await responseData.update(dataToUpdate);
            
            // Devolver el registro actualizado
            return responseF({ status: 200, success: true, message: 'usuario actualizado exitosamente', data: responseData });
        } catch (error) {
            console.error('Error en Put en el usuarioController: ', error);
            return responseF({ status: 500, success: false, message: `Error en el servidor al actualizar el usuario con id: ${id}` });
        }
    },
    
};

module.exports = usuarioController;