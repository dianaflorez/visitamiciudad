
//========================================
// Este archivo define las rutas para el modelo Card_detail.
// IMPORTA:
//      'express': El módulo Express para crear las rutas.
//      'Card_detailHandler': El handler para el modelo Card_detail.
// EXPORTA: Las rutas de Card_detail
//========================================

const express = require('express');
const router = express.Router();
const Card_detailHandler = require('../../Handlers/ModelHandlers/card_detail.handler'); // Importa el handler del modelo

// Definir rutas para el modelo Card_detail
router.get('/', Card_detailHandler.get)                 //Ruta para obtener todos los titulos

router.get('/:id', Card_detailHandler.getById);         //Ruta para obtener los títulos de las tablas
router.post('/search', Card_detailHandler.search);      //Ruta para obtener todos los datos filtrados y sin filtra
router.post('/', Card_detailHandler.post);              //Ruta para poder hacer un nuevo registro en la base de datos
router.put('/:id', Card_detailHandler.put);             //Ruta para modificar un registro

module.exports = router;
