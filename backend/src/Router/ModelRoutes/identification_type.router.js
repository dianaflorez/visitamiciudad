
//========================================
// Este archivo define las rutas para el modelo Identification_type.
// IMPORTA:
//      'express': El módulo Express para crear las rutas.
//      'Identification_typeHandler': El handler para el modelo Identification_type.
// EXPORTA: Las rutas de Identification_type
//========================================

const express = require('express');
const router = express.Router();
const Identification_typeHandler = require('../../Handlers/ModelHandlers/identification_type.handler'); // Importa el handler del modelo

// Definir rutas para el modelo Identification_type
router.get('/', Identification_typeHandler.get)                 //Ruta para obtener todos los titulos

router.get('/:id', Identification_typeHandler.getById);         //Ruta para obtener los títulos de las tablas
router.post('/search', Identification_typeHandler.search);      //Ruta para obtener todos los datos filtrados y sin filtra
router.post('/', Identification_typeHandler.post);              //Ruta para poder hacer un nuevo registro en la base de datos
router.put('/:id', Identification_typeHandler.put);             //Ruta para modificar un registro

module.exports = router;
