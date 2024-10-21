//========================================
// Este archivo crea funciones para manejar el hashing y la verificación de contraseñas.
// IMPORTA:
// 'crypto': La biblioteca de Node.js para operaciones criptográficas.
// EXPORTA: Las funciones para calcular, generar y verificar hashes de contraseñas.
//========================================
const crypto = require('crypto');

// Genera un hash SHA-512 de la contraseña y la sal
function calculateHash(password, salt) {
    return crypto.createHash('sha512').update(password + salt).digest('base64').replace(/=+$/, ''); 
}

// Genera una sal aleatoria y calcula el hash de la contraseña
function generateHash(password) {
    const salt = crypto.randomBytes(5).toString('hex');
    const hash = calculateHash(password, salt);
    return { salt, hash };
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