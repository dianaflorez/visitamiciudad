//========================================
// Este archivo contiene funciones para manejar la generación y verificación de tokens JWT.
// IMPORTA:
//      'jsonwebtoken': Librería para crear y verificar JWT.
// EXPORTA:
//      'generateToken': Función para generar un token JWT para un usuario dado.
//      'verifyToken': Función para verificar un token JWT y devolver los valores del payload.
//========================================
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;
const jwtResetSecret = process.env.JWT_RESET_PASSWORD_SECRET;

//Funciones base
const generate = (user, role, secretKey, expiresIn) => {
    const payload = { user: { id: user.UserId, username: user.Username, role }
    };

    return jwt.sign(payload, secretKey, { expiresIn });
};

const verify = (token, secretKey) => {
    const decoded = jwt.verify(token, secretKey);
    return decoded.user;
};

//Funciones del token de autenticacion
const generateToken = (user, role) => {
    return generate(user, role, jwtSecret, '1h');
};

const verifyToken = (token, refreshToken) => {
    try {
        const user = verify(token, jwtSecret);
        return { user, newToken: null, newRefreshToken: null };
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            try {
                const user = verify(refreshToken, jwtRefreshSecret);
                const newToken = generateToken(user, user.role);
                const newRefreshToken = generateRefreshToken(user, user.role);
                return { user, newToken, newRefreshToken };
            } catch (refreshError) {
                throw new Error('Invalid or expired token');
            }
        } else {
            throw new Error('Invalid or expired token');
        }
    }
};

//Funciones de RefreshToken
const generateRefreshToken = (user, role) => {
    return generate(user, role, jwtRefreshSecret, '2h');
};

const verifyRefreshToken = (token) => {
    try {
        return verify(token, jwtRefreshSecret);
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};

//Funciones de resetToken
const generateResetToken = (user) => {
    return generate(user, false, jwtResetSecret, '1h');
};

const verifyResetToken = (token) => {
    try {
        return verify(token, jwtResetSecret);
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};

module.exports = {
    generateToken,
    verifyToken,
    generateResetToken,
    verifyResetToken,
    generateRefreshToken,
    verifyRefreshToken,
};