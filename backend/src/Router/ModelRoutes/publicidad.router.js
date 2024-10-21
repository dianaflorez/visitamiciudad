
//========================================
// Este archivo define las rutas para el modelo Publicidad.
// IMPORTA:
//      'express': El módulo Express para crear las rutas.
//      'PublicidadHandler': El handler para el modelo Publicidad.
// EXPORTA: Las rutas de Publicidad
//========================================

const express = require('express');
const router = express.Router();
const PublicidadHandler = require('../../Handlers/ModelHandlers/publicidad.handler'); // Importa el handler del modelo

// Definir rutas para el modelo Publicidad
router.get('/', PublicidadHandler.get)                 //Ruta para obtener todos los titulos

router.get('/:id', PublicidadHandler.getById);         //Ruta para obtener los títulos de las tablas
router.post('/search', PublicidadHandler.search);      //Ruta para obtener todos los datos filtrados y sin filtra
router.post('/', PublicidadHandler.post);              //Ruta para poder hacer un nuevo registro en la base de datos
router.put('/:id', PublicidadHandler.put);             //Ruta para modificar un registro

module.exports = router;
