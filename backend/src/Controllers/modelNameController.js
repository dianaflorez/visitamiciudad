
//========================================
// Este archivo interactúa con la base de datos, específicamente con la tabla de ModelName.
// Establece los métodos Get, getAll, Post, Put y Delete según sea necesario.
// IMPORTA:
//      'Sequelize': La clase Sequelize para la gestión de la base de datos.
//      'initModels': La función que inicializa los modelos de la base de datos.
// EXPORTA: El controller de ModelName
//========================================
 
const { ModelName } = require('../db/db.config'); // Importa el modelo ModelName
 
// Controlador para el modelo ModelName
const ModelNameController = {
    // Obtener todos los ModelName o por filtro
    get: async ( filters ) => {
        try {
            const searchResult = await ModelName.findAll({ where: filters });
            return searchResult
        } catch ( error ) {
            console.error(error);
            throw new Error(`Error al tratar de obtener ${filters ?` ModelName por filtro `:`todos los registros de ModelName`}`)
        }
    },
 
    // Obtener un ModelName por ID
    getById: async ( id ) => {
        try {
            const modelname = await ModelName.findByPk(id);
            return modelname
        } catch ( error ) {
            console.error(error);
            throw new Error(`Error al tratar de obtener el ModelName de id: ${id}`)
        }
    },
 
    // Crear un nuevo ModelName
    post: async ( newData ) => {
        try {
            const createdModelName = await ModelName.create(newData);
            return createdModelName
        } catch (error) {
            console.error(error);
            throw new Error('Error al crear el modelname');
        }
    },
 
    // Actualizar un ModelName por ID
    put: async ( id, newData ) => {
        try {
            const modelname = await ModelName.findByPk(id);
            if (!modelname) return
            await modelname.update(newData);
            return modelname
        } catch (error) {
            console.error(error);
            throw new Error(`Error al actualizar el modelname con id: ${id}`);
        }
    },
 
    // Eliminar un ModelName por ID
    delete: async ( id ) => {
        try {
            const modelname = await ModelName.findByPk(id);
            if (!modelname) return
            await modelname.destroy();
            return 'ModelName eliminado correctamente';
        } catch (error) {
            console.error(error);
            throw new Error (`Error al eliminar el ModelName con id: ${id}`);
        }
    }
};
 
module.exports = ModelNameController;
