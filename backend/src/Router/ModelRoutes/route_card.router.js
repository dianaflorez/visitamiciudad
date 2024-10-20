
//========================================
// Este archivo define las rutas para el modelo Route_card.
// IMPORTA:
//      'express': El módulo Express para crear las rutas.
//      'Route_cardHandler': El handler para el modelo Route_card.
// EXPORTA: Las rutas de Route_card
//========================================

const express = require('express');
const router = express.Router();
const Route_cardHandler = require('../../Handlers/ModelHandlers/route_card.handler'); // Importa el handler del modelo

// Definir rutas para el modelo Route_card
router.get('/', Route_cardHandler.get)                 //Ruta para obtener todos los titulos

router.get('/:id', Route_cardHandler.getById);         //Ruta para obtener los títulos de las tablas
router.post('/search', Route_cardHandler.search);      //Ruta para obtener todos los datos filtrados y sin filtra
router.post('/', Route_cardHandler.post);              //Ruta para poder hacer un nuevo registro en la base de datos
router.put('/:id', Route_cardHandler.put);             //Ruta para modificar un registro

module.exports = router;
