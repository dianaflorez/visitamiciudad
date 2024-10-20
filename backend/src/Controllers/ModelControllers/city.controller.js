//========================================
// Este archivo interactúa con la base de datos, específicamente con la tabla de City.
// Establece los métodos Get, getAll, Post, Put y Delete según sea necesario.
// IMPORTA:
//      'db': La clase db para la gestión de la base de datos.
//      'City': Modelo con el que interactua
//      'responseF': Generador de respuestas
// EXPORTA: El controller de City
//========================================
const { Sequelize, Op } = require('sequelize');
const { db } = require('../../db/db.config');                       //Importa la instancia de db
const { City } = require('../../db/db.config');  //Importa el modelo City
const { responseF } = require('../../Helpers/responseF'); // Importa el creador de respuesta formato

const validateForeignKeys = async (foreignKeys) => {
    for (const [key, value] of Object.entries(foreignKeys)) {
        if (value) {
            const associatedModel = db.models[City.getAttributes()[key].references.model];
            const associatedInstance = await associatedModel.findByPk(value);
            if (!associatedInstance) {
                return { error: true, field: key, value };
            }
        }
    };
};

const include = [
    { model: db.models["departamento"], as: "cod_country_departamento" },
    { model: db.models["departamento"], as: "cod_dep_departamento" }
]

const exclude = [
    "cod_country", "cod_dep"
]

const filterMappings = {
    cod: '$cod_country_departamento.$',
    cod: '$cod_dep_departamento.$'
};

// Controlador para el modelo City
const CityController = {
    // Obtener los títulos de las columnas de City
    get: async () => {
        try {
            const attributes = Object.keys(City.getAttributes());
            return responseF({ status: 200, success: true, data: attributes });
        } catch (error) {
            console.error('Error en get en el CityController: ', error);
            return responseF({ status: 500, message: 'Error interno al tratar de obtener los títulos de las columnas', success: false });
        }
    },

    // Obtener un City por ID
        getById: async (id) => {
            try {
                const city = await City.findByPk(id);
                if (!city) 
                    return responseF({ status: 404, message: 'City no encontrado.', success: false });

                return responseF({ status: 200, success: true, data: city });
            } catch (error) {
                console.error('Error en getById en el CityController: ' + id, error);
                return responseF({ status: 500, success: false, message: 'Error interno al tratar de obtener el City',
                });
            }
        },
    
    // Obtener todos los City o por filtros
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
            
        
               if (orderField === 'cod_country_departamento')
                    order = [[{ model: db.models["departamento"], as: 'cod_country_departamento' }, '', orderType]];
        
                else if (orderField === 'cod_dep_departamento')
                    order = [[{ model: db.models["departamento"], as: 'cod_dep_departamento' }, '', orderType]];
        
                else
                   order = [[orderField, orderType]];

            } else {
                order = undefined;
            }

            const searchResult = await City.findAndCountAll({
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
            console.error('Error en Search en el CityController: ', error);
            return responseF({ status: 500, success: false, message: `Error interno al tratar de obtener ${filters ?` City por filtro `:`todos los registros de City`}`});
        }
    },

    // Crear un nuevo City
    post: async ( newData ) => {
        try {
            const foreignKeyValidationResult = await validateForeignKeys(newData.foreignKeys);
            if (foreignKeyValidationResult?.error) {
                return responseF({ status: 400, success: false, message: 'Error de validación de llave foránea' });
            }

            const dataToCreate = { ...newData.regularFields, ...newData.foreignKeys };
            const createdCity = await City.create(dataToCreate);

            return responseF({ status: 201, success: true, message:'Registro creado exitosamente', data: createdCity });
        } catch (error) {
            console.error('Error en post en el CityController: ', error);
            return responseF({ status: 500, message: 'Error interno al crear el City', success: false });
        }
    },

    // Actualizar un City por ID
    put: async ( id, newData ) => {
        try {
            const city = await City.findByPk(id);
            if (!city)
                return responseF({  status: 404,  success: false,  message: 'City no encontrado' });

            const foreignKeyValidationResult = await validateForeignKeys(newData.foreignKeys);
            if (foreignKeyValidationResult?.error)
                    return responseF({ status: 400, success: false, message: 'Error de validación de llave foránea' });

            // Agregar llaves foráneas a los campos regulares
            const dataToUpdate = { ...newData.regularFields, ...newData.foreignKeys };
            
            await city.update(dataToUpdate);
            
            // Devolver el registro actualizado
            return responseF({ status: 200, success: true, message: 'City actualizado exitosamente', data: city });
        } catch (error) {
            console.error('Error en Put en el CityController: ', error);
            return responseF({ status: 500, success: false, message: `Error en el servidor al actualizar el city con id: ${id}` });
        }
    },
    
};

module.exports = CityController;