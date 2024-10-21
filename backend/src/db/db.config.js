// EXPORTA: La base de datos y los modelos destructurados
//========================================
const { Sequelize } = require('sequelize');
require('dotenv').config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

// Importación de la función que inicializa los modelos de la base de datos.
const initModels = require('./models/init-models');

// Crea una nueva instancia de Sequelize para establecer la conexión con la base de datos.
const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST.replace('http://', ''),  // Elimina el prefijo 'http://' si lo tiene
  port: DB_PORT || 5432,  // Asegúrate de que el puerto sea 5432
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,  // Requiere SSL para la conexión
      rejectUnauthorized: false  // No rechaza conexiones no autorizadas (útil para entornos de desarrollo)
    }
  },
  logging: false,  // Desactiva el logging si no lo necesitas
  define: {
    timestamps: false,
    underscored: true,
  }
});

// Inicializa los modelos de la base de datos pasando la conexión.
initModels(db);

module.exports = {...db.models, db};