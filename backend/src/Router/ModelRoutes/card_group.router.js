
//========================================
// Este archivo define las rutas para el modelo Card_group.
// IMPORTA:
//      'express': El módulo Express para crear las rutas.
//      'Card_groupHandler': El handler para el modelo Card_group.
// EXPORTA: Las rutas de Card_group
//========================================

const express = require('express');
const router = express.Router();
const Card_groupHandler = require('../../Handlers/ModelHandlers/card_group.handler'); // Importa el handler del modelo

// Definir rutas para el modelo Card_group
router.get('/', Card_groupHandler.get)                 //Ruta para obtener todos los titulos

router.get('/:id', Card_groupHandler.getById);         //Ruta para obtener los títulos de las tablas
router.post('/search', Card_groupHandler.search);      //Ruta para obtener todos los datos filtrados y sin filtra
router.post('/', Card_groupHandler.post);              //Ruta para poder hacer un nuevo registro en la base de datos
router.put('/:id', Card_groupHandler.put);             //Ruta para modificar un registro

module.exports = router;
