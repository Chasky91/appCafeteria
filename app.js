import express, { json } from "express"

import { empleadoRouter } from "./router/empleadoRouter.js"
import { ordenRouter } from "./router/ordenesRouter.js"
import { clienteRouter } from "./router/clienteRouter.js"
import { corsCafeteria } from "./cors.js"


const app = express()
app.use(express.json())
app.disable("x-powered-by")

app.use(corsCafeteria())

//routers
app.use("/empleados", empleadoRouter)
app.use("/ordenes", ordenRouter)
app.use("/cliente", clienteRouter)

const PUERTO = 5000


//http://localhost:5000/"
//La linea siguiente es un endpoint

app.get('/', (req, res) => {

    res.send("<h1>Hola CENT 444</h1>");

})


app.listen(PUERTO, () => {
    console.log('Servidor andando')
    console.log(`http://localhost:${PUERTO}`)
})