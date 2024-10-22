//========================================
// Este archivo configura el endpoint de inicio de sesión para la aplicación Express.
// IMPORTA:
//      'loginHandler': Handler para gestionar el inicio de sesión desde '../Handlers/loginHandler'.
// EXPORTA: El endpoint de inicio de sesión configurado.
//========================================

const express = require('express');
const loginHandler = require('../Handlers/login.handler');

const loginRouter = express.Router();

// Endpoint de inicio de sesión
loginRouter.post('/login', loginHandler.login);
loginRouter.post('/signup', loginHandler.signup);

module.exports = loginRouter;