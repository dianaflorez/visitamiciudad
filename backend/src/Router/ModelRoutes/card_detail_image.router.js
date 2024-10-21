
//========================================
// Este archivo define las rutas para el modelo Card_detail_image.
// IMPORTA:
//      'express': El módulo Express para crear las rutas.
//      'Card_detail_imageHandler': El handler para el modelo Card_detail_image.
// EXPORTA: Las rutas de Card_detail_image
//========================================

const express = require('express');
const router = express.Router();
const Card_detail_imageHandler = require('../../Handlers/ModelHandlers/card_detail_image.handler'); // Importa el handler del modelo

// Definir rutas para el modelo Card_detail_image
router.get('/', Card_detail_imageHandler.get)                 //Ruta para obtener todos los titulos

router.get('/:id', Card_detail_imageHandler.getById);         //Ruta para obtener los títulos de las tablas
router.post('/search', Card_detail_imageHandler.search);      //Ruta para obtener todos los datos filtrados y sin filtra
router.post('/', Card_detail_imageHandler.post);              //Ruta para poder hacer un nuevo registro en la base de datos
router.put('/:id', Card_detail_imageHandler.put);             //Ruta para modificar un registro

module.exports = router;
