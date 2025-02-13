## 🏙️ **Visita Mi Ciudad**  

**Visita Mi Ciudad** es una aplicación web diseñada para ayudar a los turistas a descubrir los mejores lugares y rutas en la ciudad. Permite visualizar sitios de interés, crear rutas personalizadas y mejorar la economía local al promover negocios y eventos. Ademas las sugerencias de rutas se realizan por medio de IA con OpenAI.

---

## 🚀 **Tecnologías utilizadas**  

### **Frontend**  
- **React.js** con **Material UI** para la interfaz  
- **React Router** para la navegación  
- **Leaflet.js** o **Google Maps API** para la visualización de rutas  
- **Axios** para la comunicación con el backend  

### **Backend**  
- **Node.js** con **Express**  
- **PostgreSQL** con **Sequelize**  
- **JWT (JSON Web Token)** para autenticación  
- **CORS** para permitir solicitudes desde el frontend  

### **Despliegue**  
- **Frontend y Backend en Digital Ocean (Linux)**  
- **Base de datos en PostgreSQL en Render**  

---

## 📌 **Características principales**  

✅ **Exploración de sitios turísticos**: Los usuarios pueden ver una lista de lugares destacados con descripciones y fotos.  
✅ **Creación de rutas personalizadas**: Basado en preferencias, el usuario puede armar su propio recorrido.  
✅ **Rutas recomendadas por IA** *(futuro desarrollo)*: Generación automática de rutas basadas en intereses.  
✅ **Mapa interactivo**: Visualización de rutas en el mapa con puntos de interés.  
✅ **Soporte para negocios locales**: Los comercios pueden registrarse y aparecer en la app.  

---

## 🌍 **Despliegue en producción**  

🔹 **Frontend y Backend en Digital Ocean**: [`https://visitamiciudad.com`](https://visitamiciudad.com)  
🔹 **Base de datos en PostgreSQL en Render**  

⚠️ **Nota:** Si el backend no responde, asegúrate de que el servidor en Digital Ocean está activo y que la conexión con la base de datos en Render está funcionando correctamente.  

---

## 🛠️ **Instalación y ejecución local**  

### 🔹 **1️⃣ Clonar el repositorio**  
```bash
git clone https://github.com/dianaflorez/visitamiciudad.git
cd visitamiciudad
```

### 🔹 **2️⃣ Configurar el backend**  
1. Ve a la carpeta del backend:  
   ```bash
   cd backend
   ```
2. Instala las dependencias:  
   ```bash
   npm install
   ```
3. Crea un archivo `.env` con la configuración de la base de datos:  
   ```
   DATABASE_URL=postgres://usuario:password@database-host:port/visitamiciudad
   PORT=5000
   JWT_SECRET=clave_secreta
   ```

4. Ejecuta las migraciones de la base de datos:  
   ```bash
   npx sequelize-cli db:migrate
   ```

5. Inicia el backend:  
   ```bash
   npm start
   ```
   El backend se ejecutará en `http://localhost:5000`.  

### 🔹 **3️⃣ Configurar el frontend**  
1. Ve a la carpeta del frontend:  
   ```bash
   cd frontend
   ```
2. Instala las dependencias:  
   ```bash
   npm install
   ```
3. Crea un archivo `.env` con la URL del backend:  
   ```
   VITE_API_URL=http://localhost:5000
   ```

4. Inicia el frontend:  
   ```bash
   npm run dev
   ```
   El frontend estará en `http://localhost:5173`.  

---

## 🔥 **API - Endpoints principales**  

| Método | Ruta | Descripción |
|--------|------|------------|
| **GET** | `/api/sitios` | Obtiene todos los sitios turísticos |
| **POST** | `/api/sitios` | Crea un nuevo sitio (requiere autenticación) |
| **GET** | `/api/rutas` | Obtiene todas las rutas recomendadas |
| **POST** | `/api/rutas` | Genera una nueva ruta personalizada |
| **POST** | `/api/auth/login` | Inicia sesión y obtiene un token |
| **POST** | `/api/auth/register` | Registra un nuevo usuario |

💡 **Prueba la API** con [Postman](https://www.postman.com/) o [Thunder Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client).  

---

## 🛠 **Solución de errores comunes**  

❌ **El backend no responde en Digital Ocean**  
📌 Asegúrate de que el servicio está corriendo:  
```bash
pm2 status
pm2 restart all
```
📌 Verifica que el puerto correcto está expuesto en el servidor.  

❌ **Problema de conexión con PostgreSQL en Render**  
📌 Confirma que en `.env` está el `DATABASE_URL` correcto y que Render permite conexiones externas.  

❌ **Frontend no conecta con backend en producción**  
📌 Revisa que en el archivo `.env` del frontend tengas:  
```bash
VITE_API_URL=https://visitamiciudad.com/api
```
Y que en el servidor de Digital Ocean, `CORS` permite las conexiones desde el dominio del frontend.  

---

## 📜 **Licencia**  
Este proyecto está bajo la **MIT License**, por lo que puedes usarlo y modificarlo libremente.  

🚀 **Contribuciones son bienvenidas**. Si deseas mejorar la app, abre un **issue** o envía un **pull request**.  

---

## 🎯 **Autores**  
👩‍💻 **Diana Flórez**  
📧 Contacto: [LinkedIn](https://linkedin.com/in/dianaflorez)  

---

Con este README tu proyecto quedará bien documentado y cualquier persona podrá entenderlo y contribuir. 🚀 ¿Te gustaría agregar algún detalle extra? 😊
