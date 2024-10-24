require('dotenv').config(); // Importar dotenv para leer el archivo .env
const { verifyPassword, generateHash } = require('../Helpers/hashHelper');
const { generateToken, generateRefreshToken } = require('../Helpers/jwtHelper');
const { usuario } = require('../db/db.config');

// Controlador para el inicio de sesión
const loginController = {
    // Iniciar sesión
    login: async (email, password) => {
        try {
            const user = await usuario.findOne({ where: { email } });

            if (!user) {
                return { status: 404, response: { success: false, message: 'Usuario o contraseña inválidos' } };
            }

            // Utilizar JWT_SALT del .env en lugar de user.PasswordSalt
            const isPasswordValid = verifyPassword(password, user.password, process.env.JWT_SALT);

            if (!isPasswordValid) {
                return { status: 401, response: { success: false, message: 'Usuario o contraseña inválidos' } };
            }


            const token = generateToken(user);
            const refreshToken = generateRefreshToken(user, null);
            const { username, role_id, id } = user

            return {
                status: 200,
                response: {
                    success: true,
                    token,
                    refreshToken,
                    username,
                    role_id,
                    id
                },
            };
        } catch (error) {
            console.error('Error en el controlador de inicio de sesión:', error);
            return { status: 500, response: { success: false, message: 'Error interno al procesar el inicio de sesión' } };
        }
    },

     // Registrar usuario
     signup: async (email, password, name) => {
        try {
            // Verificar si el usuario ya existe
            const userExists = await usuario.findOne({ where: { email } });
            if (userExists) {
                return { status: 409, response: { success: false, message: 'El usuario ya está registrado' } };
            }

            // Generar hash de la contraseña utilizando JWT_SALT del .env
            const { hash } = generateHash(password);
            const username = email.split('@')[0];

            // Crear el nuevo usuario en la base de datos
            const newUser = await usuario.create({
                email,
                name,
                password: hash,
                username,
                role_id: 3,
                id
            });

            const { role_id, id } = newUser

            // Generar un token JWT para el nuevo usuario
            const token = generateToken(newUser, 'user');
            const refreshToken = generateRefreshToken(newUser, null);

            return {
                status: 201,
                response: {
                    success: true,
                    message: 'Usuario registrado exitosamente',
                    token,
                    refreshToken,
                    role_id:3
                },
            };
        } catch (error) {
            console.error('Error en el controlador de registro:', error);
            return { status: 500, response: { success: false, message: 'Error interno al procesar el registro' } };
        }
    }
};

module.exports = loginController;
