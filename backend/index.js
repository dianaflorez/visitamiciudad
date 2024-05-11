const express = require("express")
require('dotenv').config();
// const router = require("./config/Routes/routes.config")
// const {swaggerUi, specs} = require("./swagger")
const SERVER_PORT = process.env.SERVER_PORT

console.log(SERVER_PORT);


const app = express();
// require('./config/db.config')

app.use(express.json());
// app.use(router)

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(SERVER_PORT, () => {
    console.log("Listening in port " + SERVER_PORT);
})
