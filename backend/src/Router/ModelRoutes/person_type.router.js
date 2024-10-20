
//========================================
// Este archivo define las rutas para el modelo Person_type.
// IMPORTA:
//      'express': El módulo Express para crear las rutas.
//      'Person_typeHandler': El handler para el modelo Person_type.
// EXPORTA: Las rutas de Person_type
//========================================

const express = require('express');
const router = express.Router();
const Person_typeHandler = require('../../Handlers/ModelHandlers/person_type.handler'); // Importa el handler del modelo

// Definir rutas para el modelo Person_type
router.get('/', Person_typeHandler.get)                 //Ruta para obtener todos los titulos

router.get('/:id', Person_typeHandler.getById);         //Ruta para obtener los títulos de las tablas
router.post('/search', Person_typeHandler.search);      //Ruta para obtener todos los datos filtrados y sin filtra
router.post('/', Person_typeHandler.post);              //Ruta para poder hacer un nuevo registro en la base de datos
router.put('/:id', Person_typeHandler.put);             //Ruta para modificar un registro

module.exports = router;
