
//========================================
// Este archivo define las rutas para el modelo Usuario.
// IMPORTA:
//      'express': El módulo Express para crear las rutas.
//      'UsuarioHandler': El handler para el modelo Usuario.
// EXPORTA: Las rutas de Usuario
//========================================

const express = require('express');
const router = express.Router();
const UsuarioHandler = require('../../Handlers/ModelHandlers/usuario.handler'); // Importa el handler del modelo

// Definir rutas para el modelo Usuario
router.get('/', UsuarioHandler.get)                 //Ruta para obtener todos los titulos

router.get('/:id', UsuarioHandler.getById);         //Ruta para obtener los títulos de las tablas
router.post('/search', UsuarioHandler.search);      //Ruta para obtener todos los datos filtrados y sin filtra
router.post('/', UsuarioHandler.post);              //Ruta para poder hacer un nuevo registro en la base de datos
router.put('/:id', UsuarioHandler.put);             //Ruta para modificar un registro

module.exports = router;
