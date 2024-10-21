// Importación de módulos y configuración
const http = require('http');
require('dotenv').config(); // Corregido para cargar correctamente las variables de entorno
const server = require('./src/server'); // Importa el servidor
const api_port = process.env.PORT || 3001; // Puerto del servidor API
const { db } = require('./src/db/db.config'); // Importa la configuración de la base de datos
require('dotenv').config();

// Conexión a la base de datos y arranque del servidor
db.authenticate()
  .then(() => {
    // Si la conexión a la base de datos es exitosa
    console.log('Connection to the database has been established successfully.');
    http.createServer(server).listen(api_port, () => {
      console.log(`Servidor HTTP corriendo en http://localhost:${api_port}`);
    });
  })
  .catch(err => {
    // Si hay un error en la conexión a la base de datos
    console.error('Unable to connect to the database:', err);
});