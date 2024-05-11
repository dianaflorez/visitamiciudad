const express = require("express")
const router = require("./config/Routes/routes.config")
const {swaggerUi, specs} = require("./swagger")

const app = express();
require('./config/db.config')

app.use(express.json());
app.use(router)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(8000, () => {
    console.log("Listening in port 8000");
})
