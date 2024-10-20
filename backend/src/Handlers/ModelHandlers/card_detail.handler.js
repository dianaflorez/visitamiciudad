//========================================
// Este archivo interactúa con la base de datos, específicamente con la tabla de Card_detail.
// Establece los métodos Get, getAll, Post, Put y Delete según sea necesario.
// IMPORTA:
//      'Card_detailController': Controlador del modelo Card_detail
//      'postValidation': La función de validación para creación desde '../../helpers/validationHelper'.
//      'putValidation': La función de validación para actualización desde '../../helpers/validationHelper'.
//      'responseF': Generador de respuestas '../../Helpers/responseF'.
// EXPORTA: El handler de Card_detail
//========================================

const { postValidation, putValidation } = require('../../Helpers/validationHelper'); // Importa las funciones de validación
const Card_detailController = require('../../Controllers/ModelControllers/Card_detail.controller'); // Importa el controlador del modelo
const { response } = require('../../Helpers/responseF'); // Importa el creador de respuesta formato

// Handler para el modelo Card_detail
const Card_detailHandler = {
    // Obtener los títulos de las columnas de Card_detail
    get: async (req, res) => {
        try {
            const result = await Card_detailController.get();
            return res.status(result.status).json(result.response);
        } catch (error) {
            console.error('Error en Get en el Card_detailHandler: ', error);
            res.status(500).json({ success: false, message: 'Error inesperado al obtener los títulos de las columnas' });
        }
    },

    // Obtener un Card_detail por ID
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const  result = await Card_detailController.getById(id);
            if (! result) {
                res.status(404).json({ error: 'No se encontró el dato' });
            } else {
                return res.status(result.status).json(result.response);
            }
        } catch (error) {
            console.error('Error en getById en el Card_detailHandler: ', error);
            return res.status(500).json({ success: false, message: 'Error inesperado al obtener el dato' });
        }
    },

    // Obtener todos los Card_detail o por filtro
    search: async (req, res) => {
        try {
            const { filters, pagination, orderField, orderType } = req.body;
            const result = await Card_detailController.search(filters, pagination, orderField, orderType);
            return res.status(result.status).json(result.response);
        } catch (error) {
            console.error('Error en Search en el Card_detailHandler: ', error);
            return res.status(500).json({ success: false, message: 'Error inesperado al obtener los datos' });
        }
    },

    // Crear un nuevo Card_detail
    post: async (req, res) => {
        try {
            const newData = req.body;
            
            const validationResult = await postValidation('Card_detail', newData );

            if (validationResult.error) {
                return res.status(400).json({ success: false, message: validationResult.error });
            }

            const result = await Card_detailController.post(validationResult);
            if (result.error)
                return res.status(400).json({
                    success: false,
                    message: `Error en la llave foránea: No existe el id ${createdCard_detail.field.key} en el modelo ${createdCard_detail.field.value}`
                });

            return res.status(result.status).json(result.response);
        } catch (error) {
            console.error('Error en Post en el Card_detailHandler: ', error);
            return res.status(500).json({ success: false, message: 'Error inesperado al crear el nuevo dato' });
        }
    },

    // Actualizar un Card_detail por ID
    put: async (req, res) => {
        try {
            const { id } = req.params;
            const newData = req.body;
            
            const validationResult = putValidation('Card_detail', newData);

            if (validationResult.error) {
                return res.status(400).json({ success: false, message: validationResult.error });
            }

            const result = await Card_detailController.put(id, validationResult);

            if (result.error) 
                return res.status(400).json({
                    success: false,
                    message: `Error en la llave foránea: No existe el id ${result.field.key} en el modelo ${result.field.value}`
                });

            else if (result.status === 404)
                return res.status(404).json({ success: false, message: 'Card_detail no encontrado' });

            return res.status(result.status).json(result.response);
        } catch (error) {
            console.error('Error en Put en el Card_detailHandler: ', error);
            res.status(500).json({ success: false, message: 'Error inesperado al actualizar el dato' });
        }
    },
    

};

module.exports = Card_detailHandler;