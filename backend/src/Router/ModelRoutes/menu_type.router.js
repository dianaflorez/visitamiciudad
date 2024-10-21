
//========================================
// Este archivo define las rutas para el modelo Menu_type.
// IMPORTA:
//      'express': El módulo Express para crear las rutas.
//      'Menu_typeHandler': El handler para el modelo Menu_type.
// EXPORTA: Las rutas de Menu_type
//========================================

const express = require('express');
const router = express.Router();
const Menu_typeHandler = require('../../Handlers/ModelHandlers/menu_type.handler'); // Importa el handler del modelo

// Definir rutas para el modelo Menu_type
router.get('/', Menu_typeHandler.get)                 //Ruta para obtener todos los titulos

router.get('/:id', Menu_typeHandler.getById);         //Ruta para obtener los títulos de las tablas
router.post('/search', Menu_typeHandler.search);      //Ruta para obtener todos los datos filtrados y sin filtra
router.post('/', Menu_typeHandler.post);              //Ruta para poder hacer un nuevo registro en la base de datos
router.put('/:id', Menu_typeHandler.put);             //Ruta para modificar un registro

module.exports = router;
