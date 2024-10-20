//========================================
// Este archivo interactúa con la base de datos, específicamente con la tabla de Route_card.
// Establece los métodos Get, getAll, Post, Put y Delete según sea necesario.
// IMPORTA:
//      'Route_cardController': Controlador del modelo Route_card
//      'postValidation': La función de validación para creación desde '../../helpers/validationHelper'.
//      'putValidation': La función de validación para actualización desde '../../helpers/validationHelper'.
//      'responseF': Generador de respuestas '../../Helpers/responseF'.
// EXPORTA: El handler de Route_card
//========================================

const { postValidation, putValidation } = require('../../Helpers/validationHelper'); // Importa las funciones de validación
const Route_cardController = require('../../Controllers/ModelControllers/Route_card.controller'); // Importa el controlador del modelo
const { response } = require('../../Helpers/responseF'); // Importa el creador de respuesta formato

// Handler para el modelo Route_card
const Route_cardHandler = {
    // Obtener los títulos de las columnas de Route_card
    get: async (req, res) => {
        try {
            const result = await Route_cardController.get();
            return res.status(result.status).json(result.response);
        } catch (error) {
            console.error('Error en Get en el Route_cardHandler: ', error);
            res.status(500).json({ success: false, message: 'Error inesperado al obtener los títulos de las columnas' });
        }
    },

    // Obtener un Route_card por ID
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const  result = await Route_cardController.getById(id);
            if (! result) {
                res.status(404).json({ error: 'No se encontró el dato' });
            } else {
                return res.status(result.status).json(result.response);
            }
        } catch (error) {
            console.error('Error en getById en el Route_cardHandler: ', error);
            return res.status(500).json({ success: false, message: 'Error inesperado al obtener el dato' });
        }
    },

    // Obtener todos los Route_card o por filtro
    search: async (req, res) => {
        try {
            const { filters, pagination, orderField, orderType } = req.body;
            const result = await Route_cardController.search(filters, pagination, orderField, orderType);
            return res.status(result.status).json(result.response);
        } catch (error) {
            console.error('Error en Search en el Route_cardHandler: ', error);
            return res.status(500).json({ success: false, message: 'Error inesperado al obtener los datos' });
        }
    },

    // Crear un nuevo Route_card
    post: async (req, res) => {
        try {
            const newData = req.body;
            
            const validationResult = await postValidation('Route_card', newData );

            if (validationResult.error) {
                return res.status(400).json({ success: false, message: validationResult.error });
            }

            const result = await Route_cardController.post(validationResult);
            if (result.error)
                return res.status(400).json({
                    success: false,
                    message: `Error en la llave foránea: No existe el id ${createdRoute_card.field.key} en el modelo ${createdRoute_card.field.value}`
                });

            return res.status(result.status).json(result.response);
        } catch (error) {
            console.error('Error en Post en el Route_cardHandler: ', error);
            return res.status(500).json({ success: false, message: 'Error inesperado al crear el nuevo dato' });
        }
    },

    // Actualizar un Route_card por ID
    put: async (req, res) => {
        try {
            const { id } = req.params;
            const newData = req.body;
            
            const validationResult = putValidation('Route_card', newData);

            if (validationResult.error) {
                return res.status(400).json({ success: false, message: validationResult.error });
            }

            const result = await Route_cardController.put(id, validationResult);

            if (result.error) 
                return res.status(400).json({
                    success: false,
                    message: `Error en la llave foránea: No existe el id ${result.field.key} en el modelo ${result.field.value}`
                });

            else if (result.status === 404)
                return res.status(404).json({ success: false, message: 'Route_card no encontrado' });

            return res.status(result.status).json(result.response);
        } catch (error) {
            console.error('Error en Put en el Route_cardHandler: ', error);
            res.status(500).json({ success: false, message: 'Error inesperado al actualizar el dato' });
        }
    },
    

};

module.exports = Route_cardHandler;