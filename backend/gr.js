const fs = require('fs');
const path = require('path');
const { db } = require('./src/db/db.config');

// Ruta donde se guardarán las rutas
const routesPath = path.resolve(__dirname, './src/Router/ModelRoutes');

// Verificar si el directorio 'ModelRoutes' existe, si no existe, crearlo
if (!fs.existsSync(routesPath)) {
    fs.mkdirSync(routesPath);
    console.log("Directorio 'routes' creado exitosamente.");
}

// Función para crear el contenido del archivo de rutas
const createRouteContent = (modelName) => {
    const capitalizedModelName = modelName.charAt(0).toUpperCase() + modelName.slice(1);

    return `
//========================================
// Este archivo define las rutas para el modelo ${capitalizedModelName}.
// IMPORTA:
//      'express': El módulo Express para crear las rutas.
//      '${capitalizedModelName}Handler': El handler para el modelo ${capitalizedModelName}.
// EXPORTA: Las rutas de ${capitalizedModelName}
//========================================

const express = require('express');
const router = express.Router();
const ${capitalizedModelName}Handler = require('../../Handlers/ModelHandlers/${modelName}.handler'); // Importa el handler del modelo

// Definir rutas para el modelo ${capitalizedModelName}
router.get('/', ${capitalizedModelName}Handler.get)                 //Ruta para obtener todos los titulos
${db.models[modelName] && db.models[modelName].getAttributes()[modelName] ? `router.get('/filters', ${capitalizedModelName}Handler.getFilters);  //Ruta para obtener todos los campos para el filtrado` : ''}
router.get('/:id', ${capitalizedModelName}Handler.getById);         //Ruta para obtener los títulos de las tablas
router.post('/search', ${capitalizedModelName}Handler.search);      //Ruta para obtener todos los datos filtrados y sin filtra
router.post('/', ${capitalizedModelName}Handler.post);              //Ruta para poder hacer un nuevo registro en la base de datos
router.put('/:id', ${capitalizedModelName}Handler.put);             //Ruta para modificar un registro

module.exports = router;
`;
};

// Crear un archivo de rutas para cada modelo
for (const modelName in db.models) {
    const routeContent = createRouteContent(modelName);
    const routeFileName = path.resolve(routesPath, `${modelName}.router.js`);
    fs.writeFileSync(routeFileName, routeContent);
    console.log(`Ruta generada para el modelo '${modelName}' en '${routeFileName}'`);
}

// Crear el archivo router.config.js para importar y configurar todas las rutas
const routerConfigContent = `//========================================
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
const reportePagosRouter = require('./reportePagos.router')
const reporteLegalizacionRouter = require('./reporteLegalizacion.router')
const formRouter = require('./form.router')
const funcionesBecarioRouter = require('./funcionesBecario.router')
const becarioUserRouter = require('./becarioUser.router')
const becarioBeneficiosRouter = require('./becarioBeneficios.router')
const ejecucionTareasAutomaticasRouter = require('./ejecucionTareasAutomaticas.router')
const bulkCreatorRouter = require('./bulkCreator.router')
const statisticsRouter = require('./statistics.router')


//Importación rutas específicas de modelos
${Object.keys(db.models).map(modelName => {
    const capitalizedModelName = modelName.charAt(0).toUpperCase() + modelName.slice(1);
    return `const ${modelName}Router = require('./ModelRoutes/${modelName}.router');`;
}).join('\n')}

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
router.use('/becarioUser', becarioUserRouter)
router.use('/BecarioBeneficios', becarioBeneficiosRouter)

router.use( authenticateAdmin );

router.use('/statistics', statisticsRouter)
router.use('/reportePagos', reportePagosRouter)
router.use('/reporteLegalizacion', reporteLegalizacionRouter)
router.use('/form', formRouter)
router.use('/funcionesBecario', funcionesBecarioRouter)
router.use('/ejecucionTareasAutomaticas', ejecucionTareasAutomaticasRouter)
router.use('/bulk', bulkCreatorRouter)

//Definir rutas de modelos
${Object.keys(db.models).map(modelName => {
    return `router.use('/${modelName}', ${modelName}Router);`;
}).join('\n')}

module.exports = router;`;

// Escribir el archivo router.config.js
const routerConfigFileName = path.resolve(__dirname, './src/Router/router.config.js');
fs.writeFileSync(routerConfigFileName, routerConfigContent);
console.log(`Archivo de configuración de rutas generado en '${routerConfigFileName}'`);