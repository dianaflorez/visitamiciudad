//========================================
// Este archivo interactúa con la base de datos, específicamente con la tabla de City.
// Establece los métodos Get, getAll, Post, Put y Delete según sea necesario.
// IMPORTA:
//      'CityController': Controlador del modelo City
//      'postValidation': La función de validación para creación desde '../../helpers/validationHelper'.
//      'putValidation': La función de validación para actualización desde '../../helpers/validationHelper'.
//      'responseF': Generador de respuestas '../../Helpers/responseF'.
// EXPORTA: El handler de City
//========================================

const { postValidation, putValidation } = require('../../Helpers/validationHelper'); // Importa las funciones de validación
const CityController = require('../../Controllers/ModelControllers/City.controller'); // Importa el controlador del modelo
const { response } = require('../../Helpers/responseF'); // Importa el creador de respuesta formato

// Handler para el modelo City
const CityHandler = {
    // Obtener los títulos de las columnas de City
    get: async (req, res) => {
        try {
            const result = await CityController.get();
            return res.status(result.status).json(result.response);
        } catch (error) {
            console.error('Error en Get en el CityHandler: ', error);
            res.status(500).json({ success: false, message: 'Error inesperado al obtener los títulos de las columnas' });
        }
    },

    // Obtener un City por ID
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const  result = await CityController.getById(id);
            if (! result) {
                res.status(404).json({ error: 'No se encontró el dato' });
            } else {
                return res.status(result.status).json(result.response);
            }
        } catch (error) {
            console.error('Error en getById en el CityHandler: ', error);
            return res.status(500).json({ success: false, message: 'Error inesperado al obtener el dato' });
        }
    },

    // Obtener todos los City o por filtro
    search: async (req, res) => {
        try {
            const { filters, pagination, orderField, orderType } = req.body;
            const result = await CityController.search(filters, pagination, orderField, orderType);
            return res.status(result.status).json(result.response);
        } catch (error) {
            console.error('Error en Search en el CityHandler: ', error);
            return res.status(500).json({ success: false, message: 'Error inesperado al obtener los datos' });
        }
    },

    // Crear un nuevo City
    post: async (req, res) => {
        try {
            const newData = req.body;
            
            const validationResult = await postValidation('City', newData );

            if (validationResult.error) {
                return res.status(400).json({ success: false, message: validationResult.error });
            }

            const result = await CityController.post(validationResult);
            if (result.error)
                return res.status(400).json({
                    success: false,
                    message: `Error en la llave foránea: No existe el id ${createdCity.field.key} en el modelo ${createdCity.field.value}`
                });

            return res.status(result.status).json(result.response);
        } catch (error) {
            console.error('Error en Post en el CityHandler: ', error);
            return res.status(500).json({ success: false, message: 'Error inesperado al crear el nuevo dato' });
        }
    },

    // Actualizar un City por ID
    put: async (req, res) => {
        try {
            const { id } = req.params;
            const newData = req.body;
            
            const validationResult = putValidation('City', newData);

            if (validationResult.error) {
                return res.status(400).json({ success: false, message: validationResult.error });
            }

            const result = await CityController.put(id, validationResult);

            if (result.error) 
                return res.status(400).json({
                    success: false,
                    message: `Error en la llave foránea: No existe el id ${result.field.key} en el modelo ${result.field.value}`
                });

            else if (result.status === 404)
                return res.status(404).json({ success: false, message: 'City no encontrado' });

            return res.status(result.status).json(result.response);
        } catch (error) {
            console.error('Error en Put en el CityHandler: ', error);
            res.status(500).json({ success: false, message: 'Error inesperado al actualizar el dato' });
        }
    },
    

};

module.exports = CityHandler;