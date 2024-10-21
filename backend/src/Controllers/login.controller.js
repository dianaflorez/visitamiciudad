//========================================
// Este archivo interactúa con la base de datos para gestionar el inicio de sesión.
// IMPORTA:
//      'verifyPassword': Función para verificar el hash de la contraseña desde '../Helpers/hashHelper'.
//      'generateToken': Función para generar un token JWT desde '../Helpers/jwtHelper'.
//      'Users': El modelo de usuario desde '../db/db.config'.
// EXPORTA: El controlador de inicio de sesión
//========================================

const { verifyPassword } = require('../Helpers/hashHelper');
const { generateToken, generateRefreshToken } = require('../Helpers/jwtHelper');
const { usuario } = require('../db/db.config');

// Controlador para el inicio de sesión
const loginController = {
    // Iniciar sesión
    login: async (username, password) => {
        try {
            const user = await usuario.findOne({ where: { username } });

            if (!user) {
                return { status: 404, response: { success: false, message: 'Usuario o contraseña invalidos' } };
            }

            const isPasswordValid = verifyPassword(password, user.PasswordHash, user.PasswordSalt);

            if (!isPasswordValid) {
                return { status: 401, response: { success: false, message: 'Usuario o contraseña invalidos' } };
            }

            // Verificar si el usuario tiene rol de administrador
            const userRole = await UserRoles.findOne({ where: { UserId: user.UserId, RoleId: 1 } });
            const role = !!userRole ? 'BecAdmin' : 'Bec';
            
            let fullName

            if (role === 'Bec') {
                const becario = await Becario.findOne({ where: { UserId: user.UserId } });
                if (becario) {
                    const primerNombre = becario.PrimerNombre ? becario.PrimerNombre : '';
                    const segundoNombre = becario.SegundoNombre ? becario.SegundoNombre : '';
                    fullName = `${primerNombre} ${segundoNombre}`;
                }
            }

            const token = generateToken(user, role);
            const refreshToken = generateRefreshToken(user, null);

            return {
                status: 200,
                response: {
                    success: true,
                    token,
                    refreshToken,
                    role,
                    fullName
                }
            };
        } catch (error) {
            console.error('Error en el controlador de inicio de sesión:', error);
            return { status: 500, response: { success: false, message: 'Error interno al procesar el inicio de sesión' } };
        }
        
    }
};

module.exports = loginController;