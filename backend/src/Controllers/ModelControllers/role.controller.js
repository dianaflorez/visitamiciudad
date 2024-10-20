//========================================
// Este archivo interactúa con la base de datos, específicamente con la tabla de Role.
// Establece los métodos Get, getAll, Post, Put y Delete según sea necesario.
// IMPORTA:
//      'db': La clase db para la gestión de la base de datos.
//      'Role': Modelo con el que interactua
//      'responseF': Generador de respuestas
// EXPORTA: El controller de Role
//========================================
const { Sequelize, Op } = require('sequelize');
const { db } = require('../../db/db.config');                       //Importa la instancia de db
const { Role } = require('../../db/db.config');  //Importa el modelo Role
const { responseF } = require('../../Helpers/responseF'); // Importa el creador de respuesta formato

const validateForeignKeys = async (foreignKeys) => {
    for (const [key, value] of Object.entries(foreignKeys)) {
        if (value) {
            const associatedModel = db.models[Role.getAttributes()[key].references.model];
            const associatedInstance = await associatedModel.findByPk(value);
            if (!associatedInstance) {
                return { error: true, field: key, value };
            }
        }
    };
};

const include = [
    
]

const exclude = [
    
]

const filterMappings = {
    
};

// Controlador para el modelo Role
const RoleController = {
    // Obtener los títulos de las columnas de Role
    get: async () => {
        try {
            const attributes = Object.keys(Role.getAttributes());
            return responseF({ status: 200, success: true, data: attributes });
        } catch (error) {
            console.error('Error en get en el RoleController: ', error);
            return responseF({ status: 500, message: 'Error interno al tratar de obtener los títulos de las columnas', success: false });
        }
    },

    // Obtener un Role por ID
        getById: async (id) => {
            try {
                const role = await Role.findByPk(id);
                if (!role) 
                    return responseF({ status: 404, message: 'Role no encontrado.', success: false });

                return responseF({ status: 200, success: true, data: role });
            } catch (error) {
                console.error('Error en getById en el RoleController: ' + id, error);
                return responseF({ status: 500, success: false, message: 'Error interno al tratar de obtener el Role',
                });
            }
        },
    
    // Obtener todos los Role o por filtros
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
            
        
        
               order = [[orderField, orderType]];

            } else {
                order = undefined;
            }

            const searchResult = await Role.findAndCountAll({
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
            console.error('Error en Search en el RoleController: ', error);
            return responseF({ status: 500, success: false, message: `Error interno al tratar de obtener ${filters ?` Role por filtro `:`todos los registros de Role`}`});
        }
    },

    // Crear un nuevo Role
    post: async ( newData ) => {
        try {
            const foreignKeyValidationResult = await validateForeignKeys(newData.foreignKeys);
            if (foreignKeyValidationResult?.error) {
                return responseF({ status: 400, success: false, message: 'Error de validación de llave foránea' });
            }

            const dataToCreate = { ...newData.regularFields, ...newData.foreignKeys };
            const createdRole = await Role.create(dataToCreate);

            return responseF({ status: 201, success: true, message:'Registro creado exitosamente', data: createdRole });
        } catch (error) {
            console.error('Error en post en el RoleController: ', error);
            return responseF({ status: 500, message: 'Error interno al crear el Role', success: false });
        }
    },

    // Actualizar un Role por ID
    put: async ( id, newData ) => {
        try {
            const role = await Role.findByPk(id);
            if (!role)
                return responseF({  status: 404,  success: false,  message: 'Role no encontrado' });

            const foreignKeyValidationResult = await validateForeignKeys(newData.foreignKeys);
            if (foreignKeyValidationResult?.error)
                    return responseF({ status: 400, success: false, message: 'Error de validación de llave foránea' });

            // Agregar llaves foráneas a los campos regulares
            const dataToUpdate = { ...newData.regularFields, ...newData.foreignKeys };
            
            await role.update(dataToUpdate);
            
            // Devolver el registro actualizado
            return responseF({ status: 200, success: true, message: 'Role actualizado exitosamente', data: role });
        } catch (error) {
            console.error('Error en Put en el RoleController: ', error);
            return responseF({ status: 500, success: false, message: `Error en el servidor al actualizar el role con id: ${id}` });
        }
    },
    
};

module.exports = RoleController;