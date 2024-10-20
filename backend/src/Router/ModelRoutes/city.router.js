
//========================================
// Este archivo define las rutas para el modelo City.
// IMPORTA:
//      'express': El módulo Express para crear las rutas.
//      'CityHandler': El handler para el modelo City.
// EXPORTA: Las rutas de City
//========================================

const express = require('express');
const router = express.Router();
const CityHandler = require('../../Handlers/ModelHandlers/city.handler'); // Importa el handler del modelo

// Definir rutas para el modelo City
router.get('/', CityHandler.get)                 //Ruta para obtener todos los titulos

router.get('/:id', CityHandler.getById);         //Ruta para obtener los títulos de las tablas
router.post('/search', CityHandler.search);      //Ruta para obtener todos los datos filtrados y sin filtra
router.post('/', CityHandler.post);              //Ruta para poder hacer un nuevo registro en la base de datos
router.put('/:id', CityHandler.put);             //Ruta para modificar un registro

module.exports = router;
