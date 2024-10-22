//========================================
// Este archivo maneja las solicitudes de inicio de sesión.
// Establece el método login según sea necesario.
// IMPORTA:
//      'loginController': Controlador para gestionar el inicio de sesión desde '../Controllers/loginController'.
// EXPORTA: El handler de inicio de sesión
//========================================

const loginController = require('../Controllers/login.controller'); // Importa el controlador de inicio de sesión

// Handler para el inicio de sesión
const loginHandler = {
    // Iniciar sesión
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const result = await loginController.login(email, password);
            res.status(result.status).json(result.response);
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
            res.status(500).json({ success: false, message: 'Error interno al procesar el inicio de sesión.' });
        }
    },

    signup: async (req, res) => {
        try {
            const { email, password, name } = req.body;
            const result = await loginController.signup(email, password, name);
            res.status(result.status).json(result.response);
        } catch (error) {
            console.error('Error en el registro:', error);
            res.status(500).json({ success: false, message: 'Error interno al procesar el registro.' });
        }
    }
};

module.exports = loginHandler;