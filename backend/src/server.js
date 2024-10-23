//========================================
// Este archivo inicializa y configura el servidor.
// IMPORTA:
//    'express': El framework Express para la creación de servidores web
//    'router': El enrutador principal desde el archivo './Router/router.config.js'
//    'cors': Middleware para permitir CORS (Cross-Origin Resource Sharing)
//    'helmet': Middleware para mejorar la seguridad HTTP
// EXPORTA: el servidor creado.
//========================================

const express = require("express");
const cors = require('cors');
const helmet = require('helmet');
const router = require('./Router/router.config.js');
const OpenAI = require('openai');
require('dotenv').config();  // Cargar variables de entorno

const server = express();

// Configurar CORS según el entorno (producción o desarrollo)
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? process.env.PROD_CORS_ORIGIN : '*',  // Permitir todas las solicitudes en desarrollo
  optionsSuccessStatus: 200,  // Para compatibilidad con navegadores antiguos
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization', 'x-refresh-token'],  // Headers permitidos
  exposedHeaders: ['x-new-token', 'x-new-refresh-token']  // Headers expuestos al cliente
};

// Activar CORS con las opciones configuradas
server.use(cors(corsOptions));

// Añadir Helmet para mejorar la seguridad HTTP
server.use(helmet());

// Configurar Content Security Policy (CSP) con Helmet
server.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:"], // Permitir imágenes locales y datos en línea
    connectSrc: ["'self'", process.env.PROD_CORS_ORIGIN],
    fontSrc: ["'self'"],
    objectSrc: ["'none'"],
    mediaSrc: ["'self'"],  // Permitir carga de archivos multimedia (PDF, JPG)
    frameSrc: ["'self'"],
    upgradeInsecureRequests: []
  },
}));

// Middleware para analizar cuerpos JSON
server.use(express.json());


// Configuración de OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Reemplaza con tu API Key de OpenAI
});

// Ruta para manejar las solicitudes de sugerencias de rutas
server.post('/api/tour', async (req, res) => {
  const { group, days } = req.body;

  try {
    // Llamar a OpenAI para obtener sugerencias de rutas turísticas
    const prompt = `Sugiere rutas turísticas en Pasto para un grupo ${group} que estará ${days} días.`;
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",  // Puedes usar GPT-3.5 o GPT-4 si está disponible
      //model: 'gpt-4o-mini',
      messages: [{ role: "user", content: prompt }],
    });

    const suggestions = response.choices[0].message.content;
    res.json({ suggestions });

  } catch (error) {
    console.error('Error al consultar OpenAI:', error);
    res.status(500).json({ error: 'Hubo un error al obtener las sugerencias' });
  }
});

// Ruta base para verificar si el servidor está corriendo
server.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

// Usar el enrutador principal
server.use(router);

// Exportar el servidor
module.exports = server;