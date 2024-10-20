//========================================
// Este archivo configura todos los routes, dividiéndolos en cada dirección según el modelo que se va a usar.
// IMPORTA:
//      'express': El módulo Express para la creación de rutas y manejo de solicitudes HTTP
// EXPORTA: El router principal configurado para manejar las rutas del servidor
//========================================
//Creación del router general
const express = require("express");
const { authenticateToken, authenticateAdmin } = require('../Middlewares/auth.middleware');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const responseLogger = require('../Middlewares/responseLogger');
const requestLogger = require('../Middlewares/request.middleware')

//Importación rutas específicas no de modelos
const testRouter = require('./test.router');
const loginRouter = require('./login.router');
const authRouter = require('./auth.router')
const passwordResetRouter = require('./passwordReset.router')
const changePasswordRouter = require('./changePassword.router')

//Importación rutas específicas de modelos
const cardRouter = require('./ModelRoutes/card.router');
const card_detailRouter = require('./ModelRoutes/card_detail.router');
const card_detail_imageRouter = require('./ModelRoutes/card_detail_image.router');
const card_groupRouter = require('./ModelRoutes/card_group.router');
const cityRouter = require('./ModelRoutes/city.router');
const countryRouter = require('./ModelRoutes/country.router');
const departamentoRouter = require('./ModelRoutes/departamento.router');
const identification_typeRouter = require('./ModelRoutes/identification_type.router');
const menuRouter = require('./ModelRoutes/menu.router');
const menu_typeRouter = require('./ModelRoutes/menu_type.router');
const person_typeRouter = require('./ModelRoutes/person_type.router');
const publicidadRouter = require('./ModelRoutes/publicidad.router');
const roleRouter = require('./ModelRoutes/role.router');
const routeRouter = require('./ModelRoutes/route.router');
const route_cardRouter = require('./ModelRoutes/route_card.router');
const usuarioRouter = require('./ModelRoutes/usuario.router');

router.use(requestLogger);

// Limitar la tasa de solicitudes para prevenir ataques de fuerza bruta en la ruta de inicio de sesión
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 10, // Límite de 5 solicitudes por IP
    message: 'Demasiadas solicitudes de inicio de sesión desde esta IP, por favor intente nuevamente después de 15 minutos'
});

// Limitar la tasa de solicitudes de restablecimiento de contraseña
const resetPasswordLimiter = rateLimit({
    windowMs: 30* 60 * 1000, // 15 minutos
    max: 5, // Límite de 5 solicitudes por IP
    message: 'Demasiadas solicitudes de restablecimiento de contraseña desde esta IP, por favor intente nuevamente después de 30 minutos'
});

//Definir rutas de no modelos
router.use('/login', loginLimiter, loginRouter)
router.use('/reset-password', passwordResetRouter)
router.use('/auth', authRouter)

// Aplicar middleware de autenticación a todas las rutas siguientes
router.use( authenticateToken );

router.use('/change-password', resetPasswordLimiter, changePasswordRouter)

//Definir rutas de modelos
router.use('/card', cardRouter);
router.use('/card_detail', card_detailRouter);
router.use('/card_detail_image', card_detail_imageRouter);
router.use('/card_group', card_groupRouter);
router.use('/city', cityRouter);
router.use('/country', countryRouter);
router.use('/departamento', departamentoRouter);
router.use('/identification_type', identification_typeRouter);
router.use('/menu', menuRouter);
router.use('/menu_type', menu_typeRouter);
router.use('/person_type', person_typeRouter);
router.use('/publicidad', publicidadRouter);
router.use('/role', roleRouter);
router.use('/route', routeRouter);
router.use('/route_card', route_cardRouter);
router.use('/usuario', usuarioRouter);

module.exports = router;