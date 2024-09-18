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
    let listadoClientes = clientes
    res.json(   listadoClientes)
})

//http://localhost:5000/cliente/1
app.get("/cliente/:id_cliente", (req, res) =>  {

    //console.log(req.params)

    let idCliente = parseInt(req.params.id_cliente)
    console.log( idCliente, "tipo`de datos que viaja `por la url")
    //console.log(idCliente, "Esta es la nueva variable")
    let listClientes = clientes

    for(let i= 0; i < listClientes.length; i++) {

        console.log(listClientes[i].id, "id del cliente", idCliente)
        if(listClientes[i].id === idCliente){
            console.log("Accede al if")
            res.json( { "cliente": listClientes[i]})
            return 
        }
    }

    res.json({"message": "el cliente no existe"})
})

app.post("/cliente", (req, res) => {

    let body = req.params.body
    
    res.json()
})


app.listen(PUERTO, () => {
    console.log('corriendo por el puerto ', PUERTO)
})