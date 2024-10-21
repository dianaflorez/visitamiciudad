//========================================
// Este archivo interactúa con la base de datos, específicamente con la tabla de Becario.
// Establece los métodos Get, getAll, Post, Put y Delete según sea necesario.
// IMPORTA:
//      'BecarioController': Controlador del modelo Becario
// EXPORTA: El handler de Becario
//========================================

const fs = require('fs');
const path = require('path');
const { db } = require('./src/db/db.config');

// Ruta donde se guardarán los handlers
const handlersPath = path.resolve(__dirname, './src/Handlers/ModelHandlers');

// Función para crear el contenido del handler
const createHandlerContent = (modelName) => {
    const modelAttributes = db.models[modelName].getAttributes();
    const capitalizedModelName = modelName.charAt(0).toUpperCase() + modelName.slice(1);
    const getFiltersMethod = db.models[modelName] && modelAttributes[modelName] ? `
    // Obtener el atributo '${modelName}' del modelo ${capitalizedModelName} para los filtros
    getFilters: async (req, res) => {
        try {
            const result = await ${capitalizedModelName}Controller.getFilters();
            return res.status(result.status).json(result.response);
        } catch (error) {
            console.error('Error en Search en el ${capitalizedModelName}Handler: ', error);
            res.status(500).json({ success: false, message: 'Error inesperado al obtener el atributo ${modelName} del modelo ${capitalizedModelName}' });
        }
    },` : '';

    return `//========================================
// Este archivo interactúa con la base de datos, específicamente con la tabla de ${capitalizedModelName}.
// Establece los métodos Get, getAll, Post, Put y Delete según sea necesario.
// IMPORTA:
//      '${capitalizedModelName}Controller': Controlador del modelo ${capitalizedModelName}
//      'postValidation': La función de validación para creación desde '../../helpers/validationHelper'.
//      'putValidation': La función de validación para actualización desde '../../helpers/validationHelper'.
//      'responseF': Generador de respuestas '../../Helpers/responseF'.
// EXPORTA: El handler de ${capitalizedModelName}
//========================================

const { postValidation, putValidation } = require('../../Helpers/validationHelper'); // Importa las funciones de validación
const ${capitalizedModelName}Controller = require('../../Controllers/ModelControllers/${capitalizedModelName}.controller'); // Importa el controlador del modelo
const { response } = require('../../Helpers/responseF'); // Importa el creador de respuesta formato

// Handler para el modelo ${capitalizedModelName}
const ${capitalizedModelName}Handler = {
    // Obtener los títulos de las columnas de ${capitalizedModelName}
    get: async (req, res) => {
        try {
            const result = await ${capitalizedModelName}Controller.get();
            return res.status(result.status).json(result.response);
        } catch (error) {
            console.error('Error en Get en el ${capitalizedModelName}Handler: ', error);
            res.status(500).json({ success: false, message: 'Error inesperado al obtener los títulos de las columnas' });
        }
    },

    // Obtener un ${capitalizedModelName} por ID
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const  result = await ${capitalizedModelName}Controller.getById(id);
            if (! result) {
                res.status(404).json({ error: 'No se encontró el dato' });
            } else {
                return res.status(result.status).json(result.response);
            }
        } catch (error) {
            console.error('Error en getById en el ${capitalizedModelName}Handler: ', error);
            return res.status(500).json({ success: false, message: 'Error inesperado al obtener el dato' });
        }
    },

    // Obtener todos los ${capitalizedModelName} o por filtro
    search: async (req, res) => {
        try {
            const { filters, pagination, orderField, orderType } = req.body;
            const result = await ${capitalizedModelName}Controller.search(filters, pagination, orderField, orderType);
            return res.status(result.status).json(result.response);
        } catch (error) {
            console.error('Error en Search en el ${capitalizedModelName}Handler: ', error);
            return res.status(500).json({ success: false, message: 'Error inesperado al obtener los datos' });
        }
    },

    // Crear un nuevo ${capitalizedModelName}
    post: async (req, res) => {
        try {
            const newData = req.body;
            ${modelAttributes['InsertUserId'] ? 'const InsertUserId = req.user.id' : ''}
            const validationResult = await postValidation('${capitalizedModelName}', newData );

            if (validationResult.error) {
                return res.status(400).json({ success: false, message: validationResult.error });
            }

            const result = await ${capitalizedModelName}Controller.post(validationResult${modelAttributes['InsertUserId'] ? ', InsertUserId' :''});
            if (result.error)
                return res.status(400).json({
                    success: false,
                    message: \`Error en la llave foránea: No existe el id \${created${capitalizedModelName}.field.key} en el modelo \${created${capitalizedModelName}.field.value}\`
                });

            return res.status(result.status).json(result.response);
        } catch (error) {
            console.error('Error en Post en el ${capitalizedModelName}Handler: ', error);
            return res.status(500).json({ success: false, message: 'Error inesperado al crear el nuevo dato' });
        }
    },

    // Actualizar un ${capitalizedModelName} por ID
    put: async (req, res) => {
        try {
            const { id } = req.params;
            const newData = req.body;
            ${modelAttributes['UpdateUserId'] ? 'const UpdateUserId = req.user.id' : ''}
            const validationResult = putValidation('${capitalizedModelName}', newData);

            if (validationResult.error) {
                return res.status(400).json({ success: false, message: validationResult.error });
            }

            const result = await ${capitalizedModelName}Controller.put(id, validationResult${modelAttributes['UpdateUserId'] ? ', UpdateUserId' :''});

            if (result.error) 
                return res.status(400).json({
                    success: false,
                    message: \`Error en la llave foránea: No existe el id \${result.field.key} en el modelo \${result.field.value}\`
                });

            else if (result.status === 404)
                return res.status(404).json({ success: false, message: '${capitalizedModelName} no encontrado' });

            return res.status(result.status).json(result.response);
        } catch (error) {
            console.error('Error en Put en el ${capitalizedModelName}Handler: ', error);
            res.status(500).json({ success: false, message: 'Error inesperado al actualizar el dato' });
        }
    },
    ${getFiltersMethod}

};

module.exports = ${capitalizedModelName}Handler;`
};

// Función para generar los handlers
const generateHandlers = async () => {
    // Verificar si el directorio 'handlers' existe, si no existe, crearlo
    if (!fs.existsSync(handlersPath)) {
        fs.mkdirSync(handlersPath);
        console.log("Directorio 'handlers' creado exitosamente.");
    }

    // Iterar sobre todos los modelos para crear los handlers
    for (const modelName in db.models) {
        const handlerContent = createHandlerContent(modelName);
        const handlerFileName = path.resolve(handlersPath, `${modelName}.handler.js`);
        fs.writeFileSync(handlerFileName, handlerContent);
        console.log(`Handler generado para el modelo '${modelName}' en '${handlerFileName}'`);
    }
};

generateHandlers();