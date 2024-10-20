//========================================
// Este archivo interactúa con la base de datos, específicamente con la tabla de Publicidad.
// Establece los métodos Get, getAll, Post, Put y Delete según sea necesario.
// IMPORTA:
//      'db': La clase db para la gestión de la base de datos.
//      'Publicidad': Modelo con el que interactua
//      'responseF': Generador de respuestas
// EXPORTA: El controller de Publicidad
//========================================
const { Sequelize, Op } = require('sequelize');
const { db } = require('../../db/db.config');                       //Importa la instancia de db
const { Publicidad } = require('../../db/db.config');  //Importa el modelo Publicidad
const { responseF } = require('../../Helpers/responseF'); // Importa el creador de respuesta formato

const validateForeignKeys = async (foreignKeys) => {
    for (const [key, value] of Object.entries(foreignKeys)) {
        if (value) {
            const associatedModel = db.models[Publicidad.getAttributes()[key].references.model];
            const associatedInstance = await associatedModel.findByPk(value);
            if (!associatedInstance) {
                return { error: true, field: key, value };
            }
        }
    };
};

const include = [
    { model: db.models["usuario"], as: "created" },
    { model: db.models["usuario"], as: "updated_by_usuario" }
]

const exclude = [
    "created_id", "updated_by"
]

const filterMappings = {
    created: '$created.$',
    updated: '$updated_by_usuario.$'
};

// Controlador para el modelo Publicidad
const PublicidadController = {
    // Obtener los títulos de las columnas de Publicidad
    get: async () => {
        try {
            const attributes = Object.keys(Publicidad.getAttributes());
            return responseF({ status: 200, success: true, data: attributes });
        } catch (error) {
            console.error('Error en get en el PublicidadController: ', error);
            return responseF({ status: 500, message: 'Error interno al tratar de obtener los títulos de las columnas', success: false });
        }
    },

    // Obtener un Publicidad por ID
        getById: async (id) => {
            try {
                const publicidad = await Publicidad.findByPk(id);
                if (!publicidad) 
                    return responseF({ status: 404, message: 'Publicidad no encontrado.', success: false });

                return responseF({ status: 200, success: true, data: publicidad });
            } catch (error) {
                console.error('Error en getById en el PublicidadController: ' + id, error);
                return responseF({ status: 500, success: false, message: 'Error interno al tratar de obtener el Publicidad',
                });
            }
        },
    
    // Obtener todos los Publicidad o por filtros
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
            
        
               if (orderField === 'created')
                    order = [[{ model: db.models["usuario"], as: 'created' }, '', orderType]];
        
                else if (orderField === 'updated_by_usuario')
                    order = [[{ model: db.models["usuario"], as: 'updated_by_usuario' }, '', orderType]];
        
                else
                   order = [[orderField, orderType]];

            } else {
                order = undefined;
            }

            const searchResult = await Publicidad.findAndCountAll({
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
            console.error('Error en Search en el PublicidadController: ', error);
            return responseF({ status: 500, success: false, message: `Error interno al tratar de obtener ${filters ?` Publicidad por filtro `:`todos los registros de Publicidad`}`});
        }
    },

    // Crear un nuevo Publicidad
    post: async ( newData ) => {
        try {
            const foreignKeyValidationResult = await validateForeignKeys(newData.foreignKeys);
            if (foreignKeyValidationResult?.error) {
                return responseF({ status: 400, success: false, message: 'Error de validación de llave foránea' });
            }

            const dataToCreate = { ...newData.regularFields, ...newData.foreignKeys };
            const createdPublicidad = await Publicidad.create(dataToCreate);

            return responseF({ status: 201, success: true, message:'Registro creado exitosamente', data: createdPublicidad });
        } catch (error) {
            console.error('Error en post en el PublicidadController: ', error);
            return responseF({ status: 500, message: 'Error interno al crear el Publicidad', success: false });
        }
    },

    // Actualizar un Publicidad por ID
    put: async ( id, newData ) => {
        try {
            const publicidad = await Publicidad.findByPk(id);
            if (!publicidad)
                return responseF({  status: 404,  success: false,  message: 'Publicidad no encontrado' });

            const foreignKeyValidationResult = await validateForeignKeys(newData.foreignKeys);
            if (foreignKeyValidationResult?.error)
                    return responseF({ status: 400, success: false, message: 'Error de validación de llave foránea' });

            // Agregar llaves foráneas a los campos regulares
            const dataToUpdate = { ...newData.regularFields, ...newData.foreignKeys };
            
            await publicidad.update(dataToUpdate);
            
            // Devolver el registro actualizado
            return responseF({ status: 200, success: true, message: 'Publicidad actualizado exitosamente', data: publicidad });
        } catch (error) {
            console.error('Error en Put en el PublicidadController: ', error);
            return responseF({ status: 500, success: false, message: `Error en el servidor al actualizar el publicidad con id: ${id}` });
        }
    },
    
};

module.exports = PublicidadController;