import express from "express"
import clientes from "./clientes.js"

const app = express()
const PUERTO = 5000


//http://localhost:5000/"
//La linea siguiente es un endpoint
app.get('/', (req, res) => {

    //primera respuesta
    res.send("<h1>Hola CENT 44</h1>");
    //segunda respuesta Prohibida arroja errores
    //res.send("<h1>Hola CENT 4</h1>");
})

//http://localhost:5000/cliente
//La linea siguiente es un endpoint
app.get('/cliente', (req, res) => {
    
    res.send("End point para todos los clientes")
})


app.listen(PUERTO, () => {
    console.log('corriendo por el puerto ', PUERTO)
})