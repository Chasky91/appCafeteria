import express from "express"

const app = express()
const PUERTO = 5000

//http://localhost:5000"/"
//La linea siguiente es un endpoint
app.get('/', (req, res) => {

    res.send("<h1>Hola CENT 44</h1>");
    //res.json({})
})

app.listen(PUERTO, () => {
    console.log('corriendo por el puerto ', PUERTO)
})