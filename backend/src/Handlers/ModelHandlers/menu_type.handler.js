//========================================
// Este archivo interactúa con la base de datos, específicamente con la tabla de Menu_type.
// Establece los métodos Get, getAll, Post, Put y Delete según sea necesario.
// IMPORTA:
//      'Menu_typeController': Controlador del modelo Menu_type
//      'postValidation': La función de validación para creación desde '../../helpers/validationHelper'.
//      'putValidation': La función de validación para actualización desde '../../helpers/validationHelper'.
//      'responseF': Generador de respuestas '../../Helpers/responseF'.
// EXPORTA: El handler de Menu_type
//========================================

const { postValidation, putValidation } = require('../../Helpers/validationHelper'); // Importa las funciones de validación
const Menu_typeController = require('../../Controllers/ModelControllers/Menu_type.controller'); // Importa el controlador del modelo
const { response } = require('../../Helpers/responseF'); // Importa el creador de respuesta formato

// Handler para el modelo Menu_type
const Menu_typeHandler = {
    // Obtener los títulos de las columnas de Menu_type
    get: async (req, res) => {
        try {
            const result = await Menu_typeController.get();
            return res.status(result.status).json(result.response);
        } catch (error) {
            console.error('Error en Get en el Menu_typeHandler: ', error);
            res.status(500).json({ success: false, message: 'Error inesperado al obtener los títulos de las columnas' });
        }
    },

    // Obtener un Menu_type por ID
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const  result = await Menu_typeController.getById(id);
            if (! result) {
                res.status(404).json({ error: 'No se encontró el dato' });
            } else {
                return res.status(result.status).json(result.response);
            }
        } catch (error) {
            console.error('Error en getById en el Menu_typeHandler: ', error);
            return res.status(500).json({ success: false, message: 'Error inesperado al obtener el dato' });
        }
    },

    // Obtener todos los Menu_type o por filtro
    search: async (req, res) => {
        try {
            const { filters, pagination, orderField, orderType } = req.body;
            const result = await Menu_typeController.search(filters, pagination, orderField, orderType);
            return res.status(result.status).json(result.response);
        } catch (error) {
            console.error('Error en Search en el Menu_typeHandler: ', error);
            return res.status(500).json({ success: false, message: 'Error inesperado al obtener los datos' });
        }
    },

    // Crear un nuevo Menu_type
    post: async (req, res) => {
        try {
            const newData = req.body;
            
            const validationResult = await postValidation('Menu_type', newData );

            if (validationResult.error) {
                return res.status(400).json({ success: false, message: validationResult.error });
            }

            const result = await Menu_typeController.post(validationResult);
            if (result.error)
                return res.status(400).json({
                    success: false,
                    message: `Error en la llave foránea: No existe el id ${createdMenu_type.field.key} en el modelo ${createdMenu_type.field.value}`
                });

            return res.status(result.status).json(result.response);
        } catch (error) {
            console.error('Error en Post en el Menu_typeHandler: ', error);
            return res.status(500).json({ success: false, message: 'Error inesperado al crear el nuevo dato' });
        }
    },

    // Actualizar un Menu_type por ID
    put: async (req, res) => {
        try {
            const { id } = req.params;
            const newData = req.body;
            
            const validationResult = putValidation('Menu_type', newData);

            if (validationResult.error) {
                return res.status(400).json({ success: false, message: validationResult.error });
            }

            const result = await Menu_typeController.put(id, validationResult);

            if (result.error) 
                return res.status(400).json({
                    success: false,
                    message: `Error en la llave foránea: No existe el id ${result.field.key} en el modelo ${result.field.value}`
                });

            else if (result.status === 404)
                return res.status(404).json({ success: false, message: 'Menu_type no encontrado' });

            return res.status(result.status).json(result.response);
        } catch (error) {
            console.error('Error en Put en el Menu_typeHandler: ', error);
            res.status(500).json({ success: false, message: 'Error inesperado al actualizar el dato' });
        }
    },
    

};

module.exports = Menu_typeHandler;