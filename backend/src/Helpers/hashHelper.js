//========================================
// Este archivo crea funciones para manejar el hashing y la verificación de contraseñas.
// IMPORTA:
// 'crypto': La biblioteca de Node.js para operaciones criptográficas.
// EXPORTA: Las funciones para calcular, generar y verificar hashes de contraseñas.
//========================================
const crypto = require('crypto');
require('dotenv').config();

// Genera un hash SHA-512 de la contraseña y la sal
function calculateHash(password, salt) {
    return crypto.createHash('sha256').update(password + salt).digest('hex').replace(/=+$/, '').substring(0, 40); 
}

// Genera el hash de la contraseña utilizando JWT_SALT del .env
function generateHash(password) {
    const salt = process.env.JWT_SALT; // Usar la sal del .env
    const hash = calculateHash(password, salt);
    return { hash };
}

// Verifica si la contraseña ingresada coincide con el hash almacenado
function verifyPassword(inputPassword, storedHash, storedSalt) {
    const hash = calculateHash(inputPassword, storedSalt);
    return hash === storedHash;
}

module.exports = {
generateHash,
verifyPassword
};