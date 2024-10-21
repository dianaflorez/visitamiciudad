
//========================================
// Este archivo define las rutas para el modelo Menu.
// IMPORTA:
//      'express': El módulo Express para crear las rutas.
//      'MenuHandler': El handler para el modelo Menu.
// EXPORTA: Las rutas de Menu
//========================================

const express = require('express');
const router = express.Router();
const MenuHandler = require('../../Handlers/ModelHandlers/menu.handler'); // Importa el handler del modelo

// Definir rutas para el modelo Menu
router.get('/', MenuHandler.get)                 //Ruta para obtener todos los titulos

router.get('/:id', MenuHandler.getById);         //Ruta para obtener los títulos de las tablas
router.post('/search', MenuHandler.search);      //Ruta para obtener todos los datos filtrados y sin filtra
router.post('/', MenuHandler.post);              //Ruta para poder hacer un nuevo registro en la base de datos
router.put('/:id', MenuHandler.put);             //Ruta para modificar un registro

module.exports = router;
