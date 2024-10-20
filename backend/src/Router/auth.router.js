//========================================
// Este archivo configura el endpoint para validar tokens JWT en la aplicación Express.
// IMPORTA:
//      'authenticateToken': Middleware para autenticar tokens JWT desde '../middlewares/authMiddleware'.
// EXPORTA: El endpoint de validación de tokens configurado.
//========================================
const { authenticateToken, authenticateResetToken, authenticateAdmin } = require('../Middlewares/auth.middleware.js');
const authRouter = require('express').Router();

// Endpoint para validar el token JWT
authRouter.post('/', authenticateToken, (req, res) => {
    res.status(200).json({ success: true, status: true });
});

// Endpoint para validar el token de restablecimiento de contraseña
authRouter.post('/reset', authenticateResetToken, (req, res) => {
    res.status(200).json({ succes: true, status: true });
});

// Endpoint para verificar si el usuario es administrador
authRouter.get('/is-admin', authenticateToken, authenticateAdmin, (req, res) => {
    res.status(200).json({ succes: true, status: true });
});

module.exports = authRouter;