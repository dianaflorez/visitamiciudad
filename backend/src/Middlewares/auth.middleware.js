//========================================
// Este archivo contiene el middleware de autenticación para validar tokens JWT.
// IMPORTA:
//      'jwtHelper': Utilidades para generar y verificar JWT.
// EXPORTA:
//      'authenticateToken': Middleware para autenticar tokens JWT en las solicitudes.
//      'authenticateResetToken': Middleware para autenticar tokens de restablecimiento de contraseña en las solicitudes.
//========================================

const { verifyToken, verifyResetToken } = require('../Helpers/jwtHelper');
const { UserRoles } = require('../db/db.config');

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const refreshToken = req.headers['x-refresh-token'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) return res.status(401).json({ success: false, message: 'Sin autorización' });

    try {
        const { user, newToken, newRefreshToken } = verifyToken(token, refreshToken);
        req.user = user;

        // Si se generan nuevos tokens, incluirlos en la respuesta
        if (newToken) {
            res.setHeader('x-new-token', newToken);
            res.setHeader('x-new-refresh-token', newRefreshToken);
        }

        next();
    } catch (error) {
        return res.status(403).json({ success: false, message: error.message });
    }
}

const authenticateResetToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: 'Sin autorización' });
    }

    try {
        const user = verifyResetToken(token);
        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json({ message: error.message });
    }
};

// Middleware para verificar si el usuario es administrador
const authenticateAdmin = async (req, res, next) => {
    try {
        if (req.user.role !== 'BecAdmin') {
            return res.status(403).json({ success: false, message: 'No tiene permisos de administrador' });
        }

        const userRole = await UserRoles.findOne({ where: { UserId: req.user.id, RoleId: 1 } });
        if (!userRole) {
            return res.status(403).json({ success: false, message: 'No tiene permisos de administrador' });
        }
        next();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error interno' });
    }
};

module.exports = { authenticateToken, authenticateResetToken, authenticateAdmin };
