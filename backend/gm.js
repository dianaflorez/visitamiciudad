//========================================
// Este archivo genera automáticamente los modelos basados en las tablas que encuentra en la base de datos.
// SOLO DEBE USARSE CUANDO SE ESTÁ ARRANCANDO LA APLICACIÓN POR PRIMERA VEZ Y NO HAY MODELOS CREADOS.
// IMPORTA:
//    'SequelizeAuto': La librería Sequelize-Auto para la generación automática de modelos Sequelize
//    'path': El módulo 'path' para la manipulación de rutas de archivos y directorios
//    'dotenv': Configuración de variables de entorno desde el archivo '.env'
//========================================

const SequelizeAuto = require('sequelize-auto');
const path = require('path');
require('dotenv').config(); 

// Configuración de la conexión a la base de datos PostgreSQL basada en tu conexión
const databaseConfig = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: 'postgres',  // Usamos PostgreSQL como dialecto
  dialectOptions: {
    ssl: {
      require: true,  // Si tu base de datos requiere SSL
      rejectUnauthorized: false // Desactiva la verificación del certificado
    }
  },
  directory: path.resolve(__dirname, 'src/db/models'), // Directorio donde se guardarán los modelos generados
  additional: {
    timestamps: true,
    underscored: true, 
  },
  logging: false  // Desactiva el logging si no lo necesitas
};

console.log('Configuración de la base de datos:', databaseConfig);

// Crear una instancia de SequelizeAuto con la configuración de la base de datos
const auto = new SequelizeAuto(databaseConfig.database, databaseConfig.username, databaseConfig.password, {
  host: databaseConfig.host,
  dialect: databaseConfig.dialect,
  dialectOptions: databaseConfig.dialectOptions,
  directory: databaseConfig.directory,
  additional: databaseConfig.additional,
  logging: databaseConfig.logging
});

// Generar los modelos Sequelize
const generateModels = async () => {
  try {
    await auto.run();
    console.log('Modelos generados correctamente.');
  } catch (err) {
    console.error('Error al generar modelos:', err);
  }
};

// Ejecutar la generación de modelos
generateModels();