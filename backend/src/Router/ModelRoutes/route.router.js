
//========================================
// Este archivo define las rutas para el modelo Route.
// IMPORTA:
//      'express': El módulo Express para crear las rutas.
//      'RouteHandler': El handler para el modelo Route.
// EXPORTA: Las rutas de Route
//========================================

const express = require('express');
const router = express.Router();
const RouteHandler = require('../../Handlers/ModelHandlers/route.handler'); // Importa el handler del modelo

// Definir rutas para el modelo Route
router.get('/', RouteHandler.get)                 //Ruta para obtener todos los titulos

router.get('/:id', RouteHandler.getById);         //Ruta para obtener los títulos de las tablas
router.post('/search', RouteHandler.search);      //Ruta para obtener todos los datos filtrados y sin filtra
router.post('/', RouteHandler.post);              //Ruta para poder hacer un nuevo registro en la base de datos
router.put('/:id', RouteHandler.put);             //Ruta para modificar un registro

module.exports = router;
