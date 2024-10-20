//========================================
// Este archivo interactúa con la base de datos, específicamente con la tabla de Usuario.
// Establece los métodos Get, getAll, Post, Put y Delete según sea necesario.
// IMPORTA:
//      'db': La clase db para la gestión de la base de datos.
//      'Usuario': Modelo con el que interactua
//      'responseF': Generador de respuestas
// EXPORTA: El controller de Usuario
//========================================
const { Sequelize, Op } = require('sequelize');
const { db } = require('../../db/db.config');                       //Importa la instancia de db
const { Usuario } = require('../../db/db.config');  //Importa el modelo Usuario
const { responseF } = require('../../Helpers/responseF'); // Importa el creador de respuesta formato

const validateForeignKeys = async (foreignKeys) => {
    for (const [key, value] of Object.entries(foreignKeys)) {
        if (value) {
            const associatedModel = db.models[Usuario.getAttributes()[key].references.model];
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

// Controlador para el modelo Usuario
const UsuarioController = {
    // Obtener los títulos de las columnas de Usuario
    get: async () => {
        try {
            const attributes = Object.keys(Usuario.getAttributes());
            return responseF({ status: 200, success: true, data: attributes });
        } catch (error) {
            console.error('Error en get en el UsuarioController: ', error);
            return responseF({ status: 500, message: 'Error interno al tratar de obtener los títulos de las columnas', success: false });
        }
    },

    // Obtener un Usuario por ID
        getById: async (id) => {
            try {
                const usuario = await Usuario.findByPk(id);
                if (!usuario) 
                    return responseF({ status: 404, message: 'Usuario no encontrado.', success: false });

                return responseF({ status: 200, success: true, data: usuario });
            } catch (error) {
                console.error('Error en getById en el UsuarioController: ' + id, error);
                return responseF({ status: 500, success: false, message: 'Error interno al tratar de obtener el Usuario',
                });
            }
        },
    
    // Obtener todos los Usuario o por filtros
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

            const searchResult = await Usuario.findAndCountAll({
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
            console.error('Error en Search en el UsuarioController: ', error);
            return responseF({ status: 500, success: false, message: `Error interno al tratar de obtener ${filters ?` Usuario por filtro `:`todos los registros de Usuario`}`});
        }
    },

    // Crear un nuevo Usuario
    post: async ( newData ) => {
        try {
            const foreignKeyValidationResult = await validateForeignKeys(newData.foreignKeys);
            if (foreignKeyValidationResult?.error) {
                return responseF({ status: 400, success: false, message: 'Error de validación de llave foránea' });
            }

            const dataToCreate = { ...newData.regularFields, ...newData.foreignKeys };
            const createdUsuario = await Usuario.create(dataToCreate);

            return responseF({ status: 201, success: true, message:'Registro creado exitosamente', data: createdUsuario });
        } catch (error) {
            console.error('Error en post en el UsuarioController: ', error);
            return responseF({ status: 500, message: 'Error interno al crear el Usuario', success: false });
        }
    },

    // Actualizar un Usuario por ID
    put: async ( id, newData ) => {
        try {
            const usuario = await Usuario.findByPk(id);
            if (!usuario)
                return responseF({  status: 404,  success: false,  message: 'Usuario no encontrado' });

            const foreignKeyValidationResult = await validateForeignKeys(newData.foreignKeys);
            if (foreignKeyValidationResult?.error)
                    return responseF({ status: 400, success: false, message: 'Error de validación de llave foránea' });

            // Agregar llaves foráneas a los campos regulares
            const dataToUpdate = { ...newData.regularFields, ...newData.foreignKeys };
            
            await usuario.update(dataToUpdate);
            
            // Devolver el registro actualizado
            return responseF({ status: 200, success: true, message: 'Usuario actualizado exitosamente', data: usuario });
        } catch (error) {
            console.error('Error en Put en el UsuarioController: ', error);
            return responseF({ status: 500, success: false, message: `Error en el servidor al actualizar el usuario con id: ${id}` });
        }
    },
    
};

module.exports = UsuarioController;