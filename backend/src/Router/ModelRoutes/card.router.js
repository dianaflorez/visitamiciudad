
//========================================
// Este archivo define las rutas para el modelo Card.
// IMPORTA:
//      'express': El módulo Express para crear las rutas.
//      'CardHandler': El handler para el modelo Card.
// EXPORTA: Las rutas de Card
//========================================

const express = require('express');
const router = express.Router();
const CardHandler = require('../../Handlers/ModelHandlers/card.handler'); // Importa el handler del modelo

// Definir rutas para el modelo Card
router.get('/', CardHandler.get)                 //Ruta para obtener todos los titulos

router.get('/menu/:id', CardHandler.getByMenuId);         //Ruta para obtener los títulos de las tablas
router.get('/:id', CardHandler.getById);         //Ruta para obtener los títulos de las tablas
router.post('/search', CardHandler.search);      //Ruta para obtener todos los datos filtrados y sin filtra
router.post('/', CardHandler.post);              //Ruta para poder hacer un nuevo registro en la base de datos
router.put('/:id', CardHandler.put);             //Ruta para modificar un registro

module.exports = router;
