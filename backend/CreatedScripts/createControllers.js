//========================================
// Este archivo recorre todos los modelos en db y crea por cada uno los controllers
// IMPORTA:
//    'fs': El módulo 'fs' para manejo de archivos.
//    'db': La configuración de la base de datos desde './src/db/db.config'.
//========================================
const fs = require('fs');
// const { db } = require('./src/db/db.config');
 
// Ruta donde se guardarán los controladores
const controllersPath = './Controllers/';
 
// Función para crear el contenido del controlador
const createControllerContent = (modelName) => {
    const capitalizedModelName = modelName.charAt(0).toUpperCase() + modelName.slice(1);
 
    return `
//========================================
// Este archivo interactúa con la base de datos, específicamente con la tabla de ${capitalizedModelName}.
// Establece los métodos Get, getAll, Post, Put y Delete según sea necesario.
// IMPORTA:
//      'Sequelize': La clase Sequelize para la gestión de la base de datos.
//      'initModels': La función que inicializa los modelos de la base de datos.
// EXPORTA: El controller de ${capitalizedModelName}
//========================================
 
const { ${capitalizedModelName} } = require('../db/db.config'); // Importa el modelo ${capitalizedModelName}
 
// Controlador para el modelo ${capitalizedModelName}
const ${capitalizedModelName}Controller = {
    // Obtener todos los ${capitalizedModelName} o por filtro
    get: async ( filters ) => {
        try {
            const searchResult = await ${capitalizedModelName}.findAll({ where: filters });
            return searchResult
        } catch ( error ) {
            console.error(error);
            throw new Error(\`Error al tratar de obtener \${filters ?\` ${capitalizedModelName} por filtro \`:\`todos los registros de ${capitalizedModelName}\`}\`)
        }
    },
 
    // Obtener un ${capitalizedModelName} por ID
    getById: async ( id ) => {
        try {
            const ${modelName.toLowerCase()} = await ${capitalizedModelName}.findByPk(id);
            return ${modelName.toLowerCase()}
        } catch ( error ) {
            console.error(error);
            throw new Error(\`Error al tratar de obtener el ${capitalizedModelName} de id: \${id}\`)
        }
    },
 
    // Crear un nuevo ${capitalizedModelName}
    post: async ( newData ) => {
        try {
            const created${capitalizedModelName} = await ${capitalizedModelName}.create(newData);
            return created${capitalizedModelName}
        } catch (error) {
            console.error(error);
            throw new Error('Error al crear el ${modelName.toLowerCase()}');
        }
    },
 
    // Actualizar un ${capitalizedModelName} por ID
    put: async ( id, newData ) => {
        try {
            const ${modelName.toLowerCase()} = await ${capitalizedModelName}.findByPk(id);
            if (!${modelName.toLowerCase()}) return
            await ${modelName.toLowerCase()}.update(newData);
            return ${modelName.toLowerCase()}
        } catch (error) {
            console.error(error);
            throw new Error(\`Error al actualizar el ${modelName.toLowerCase()} con id: \${id}\`);
        }
    },
 
    // Eliminar un ${capitalizedModelName} por ID
    delete: async ( id ) => {
        try {
            const ${modelName.toLowerCase()} = await ${capitalizedModelName}.findByPk(id);
            if (!${modelName.toLowerCase()}) return
            await ${modelName.toLowerCase()}.destroy();
            return '${capitalizedModelName} eliminado correctamente';
        } catch (error) {
            console.error(error);
            throw new Error (\`Error al eliminar el ${capitalizedModelName} con id: \${id}\`);
        }
    }
};
 
module.exports = ${capitalizedModelName}Controller;
`;
}
 
// Verificar si el directorio 'controllers' existe, si no existe, crearlo
if (!fs.existsSync(controllersPath)) {
    fs.mkdirSync(controllersPath);
    console.log("Directorio 'controllers' creado exitosamente.");
}


const controllerContent =createControllerContent("modelName");
const controllerFileName = `${controllersPath}modelNameController.js`;
fs.writeFileSync(controllerFileName, controllerContent);
console.log(`Controlador generado para el modelo '"modelName"' en 'hola'`);
// Iterar sobre todos los modelos
// for (const modelName in db.models) {
//     const controllerContent = createControllerContent(modelName);
//     
//     fs.writeFileSync(controllerFileName, controllerContent);
 
//     console.log(`Controlador generado para el modelo '${modelName}' en '${controllerFileName}'`);
// }