//========================================
// Este archivo interactúa con la base de datos, específicamente con la tabla de Person_type.
// Establece los métodos Get, getAll, Post, Put y Delete según sea necesario.
// IMPORTA:
//      'db': La clase db para la gestión de la base de datos.
//      'Person_type': Modelo con el que interactua
//      'responseF': Generador de respuestas
// EXPORTA: El controller de Person_type
//========================================
const { Sequelize, Op } = require('sequelize');
const { db } = require('../../db/db.config');                       //Importa la instancia de db
const { Person_type } = require('../../db/db.config');  //Importa el modelo Person_type
const { responseF } = require('../../Helpers/responseF'); // Importa el creador de respuesta formato

const validateForeignKeys = async (foreignKeys) => {
    for (const [key, value] of Object.entries(foreignKeys)) {
        if (value) {
            const associatedModel = db.models[Person_type.getAttributes()[key].references.model];
            const associatedInstance = await associatedModel.findByPk(value);
            if (!associatedInstance) {
                return { error: true, field: key, value };
            }
        }
    };
};

const include = [
    { model: db.models["usuario"], as: "updated_by_usuario" }
]

const exclude = [
    "updated_by"
]

const filterMappings = {
    updated: '$updated_by_usuario.$'
};

// Controlador para el modelo Person_type
const Person_typeController = {
    // Obtener los títulos de las columnas de Person_type
    get: async () => {
        try {
            const attributes = Object.keys(Person_type.getAttributes());
            return responseF({ status: 200, success: true, data: attributes });
        } catch (error) {
            console.error('Error en get en el Person_typeController: ', error);
            return responseF({ status: 500, message: 'Error interno al tratar de obtener los títulos de las columnas', success: false });
        }
    },

    // Obtener un Person_type por ID
        getById: async (id) => {
            try {
                const person_type = await Person_type.findByPk(id);
                if (!person_type) 
                    return responseF({ status: 404, message: 'Person_type no encontrado.', success: false });

                return responseF({ status: 200, success: true, data: person_type });
            } catch (error) {
                console.error('Error en getById en el Person_typeController: ' + id, error);
                return responseF({ status: 500, success: false, message: 'Error interno al tratar de obtener el Person_type',
                });
            }
        },
    
    // Obtener todos los Person_type o por filtros
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
            
        
               if (orderField === 'updated_by_usuario')
                    order = [[{ model: db.models["usuario"], as: 'updated_by_usuario' }, '', orderType]];
        
                else
                   order = [[orderField, orderType]];

            } else {
                order = undefined;
            }

            const searchResult = await Person_type.findAndCountAll({
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
            console.error('Error en Search en el Person_typeController: ', error);
            return responseF({ status: 500, success: false, message: `Error interno al tratar de obtener ${filters ?` Person_type por filtro `:`todos los registros de Person_type`}`});
        }
    },

    // Crear un nuevo Person_type
    post: async ( newData ) => {
        try {
            const foreignKeyValidationResult = await validateForeignKeys(newData.foreignKeys);
            if (foreignKeyValidationResult?.error) {
                return responseF({ status: 400, success: false, message: 'Error de validación de llave foránea' });
            }

            const dataToCreate = { ...newData.regularFields, ...newData.foreignKeys };
            const createdPerson_type = await Person_type.create(dataToCreate);

            return responseF({ status: 201, success: true, message:'Registro creado exitosamente', data: createdPerson_type });
        } catch (error) {
            console.error('Error en post en el Person_typeController: ', error);
            return responseF({ status: 500, message: 'Error interno al crear el Person_type', success: false });
        }
    },

    // Actualizar un Person_type por ID
    put: async ( id, newData ) => {
        try {
            const person_type = await Person_type.findByPk(id);
            if (!person_type)
                return responseF({  status: 404,  success: false,  message: 'Person_type no encontrado' });

            const foreignKeyValidationResult = await validateForeignKeys(newData.foreignKeys);
            if (foreignKeyValidationResult?.error)
                    return responseF({ status: 400, success: false, message: 'Error de validación de llave foránea' });

            // Agregar llaves foráneas a los campos regulares
            const dataToUpdate = { ...newData.regularFields, ...newData.foreignKeys };
            
            await person_type.update(dataToUpdate);
            
            // Devolver el registro actualizado
            return responseF({ status: 200, success: true, message: 'Person_type actualizado exitosamente', data: person_type });
        } catch (error) {
            console.error('Error en Put en el Person_typeController: ', error);
            return responseF({ status: 500, success: false, message: `Error en el servidor al actualizar el person_type con id: ${id}` });
        }
    },
    
};

module.exports = Person_typeController;