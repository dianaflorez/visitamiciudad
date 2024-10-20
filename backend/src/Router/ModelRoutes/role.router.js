
//========================================
// Este archivo define las rutas para el modelo Role.
// IMPORTA:
//      'express': El módulo Express para crear las rutas.
//      'RoleHandler': El handler para el modelo Role.
// EXPORTA: Las rutas de Role
//========================================

const express = require('express');
const router = express.Router();
const RoleHandler = require('../../Handlers/ModelHandlers/role.handler'); // Importa el handler del modelo

// Definir rutas para el modelo Role
router.get('/', RoleHandler.get)                 //Ruta para obtener todos los titulos

router.get('/:id', RoleHandler.getById);         //Ruta para obtener los títulos de las tablas
router.post('/search', RoleHandler.search);      //Ruta para obtener todos los datos filtrados y sin filtra
router.post('/', RoleHandler.post);              //Ruta para poder hacer un nuevo registro en la base de datos
router.put('/:id', RoleHandler.put);             //Ruta para modificar un registro

module.exports = router;
