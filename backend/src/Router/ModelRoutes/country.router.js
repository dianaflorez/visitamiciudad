
//========================================
// Este archivo define las rutas para el modelo Country.
// IMPORTA:
//      'express': El módulo Express para crear las rutas.
//      'CountryHandler': El handler para el modelo Country.
// EXPORTA: Las rutas de Country
//========================================

const express = require('express');
const router = express.Router();
const CountryHandler = require('../../Handlers/ModelHandlers/country.handler'); // Importa el handler del modelo

// Definir rutas para el modelo Country
router.get('/', CountryHandler.get)                 //Ruta para obtener todos los titulos

router.get('/:id', CountryHandler.getById);         //Ruta para obtener los títulos de las tablas
router.post('/search', CountryHandler.search);      //Ruta para obtener todos los datos filtrados y sin filtra
router.post('/', CountryHandler.post);              //Ruta para poder hacer un nuevo registro en la base de datos
router.put('/:id', CountryHandler.put);             //Ruta para modificar un registro

module.exports = router;
