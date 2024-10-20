
//========================================
// Este archivo define las rutas para el modelo Departamento.
// IMPORTA:
//      'express': El módulo Express para crear las rutas.
//      'DepartamentoHandler': El handler para el modelo Departamento.
// EXPORTA: Las rutas de Departamento
//========================================

const express = require('express');
const router = express.Router();
const DepartamentoHandler = require('../../Handlers/ModelHandlers/departamento.handler'); // Importa el handler del modelo

// Definir rutas para el modelo Departamento
router.get('/', DepartamentoHandler.get)                 //Ruta para obtener todos los titulos

router.get('/:id', DepartamentoHandler.getById);         //Ruta para obtener los títulos de las tablas
router.post('/search', DepartamentoHandler.search);      //Ruta para obtener todos los datos filtrados y sin filtra
router.post('/', DepartamentoHandler.post);              //Ruta para poder hacer un nuevo registro en la base de datos
router.put('/:id', DepartamentoHandler.put);             //Ruta para modificar un registro

module.exports = router;
