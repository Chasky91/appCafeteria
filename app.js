import express, { json } from "express"
import clientes from "./db/local/clientes.js"
import {validacionCompleta, validacionParcial} from "./validadores/schemaCliente.js"

import { empleadoRouter } from "./router/empleadoRouter.js"
import { ordenRouter } from "./router/ordenesRouter.js"


const app = express()
app.use(express.json())
app.disable("x-powered-by")
//router
app.use("/empleados", empleadoRouter)
app.use("/ordenes", ordenRouter)

const PUERTO = 5000


//http://localhost:5000/"
//La linea siguiente es un endpoint

//http://localhost:5000/alumnos
app.get('/', (req, res) => {

    //primera respuesta
    res.send("<h1>Hola CENT 444</h1>");
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

    let idCliente = parseInt(req.params.id_cliente)
    console.log( idCliente, "tipo`de datos que viaja `por la url")
    //console.log(idCliente, "Esta es la nueva variable")
    let listClientes = clientes

    for(let i= 0; i < listClientes.length; i++) {

        console.log(listClientes[i].id, "id del cliente", idCliente)
        if(listClientes[i].id === idCliente){
            res.json(listClientes[i] )
            return 
        }
    }

    res.status(404).json({"message": "el cliente no existe"})
})

app.put("/cliente/:id_cliente", (req, res) =>  {

    let idCliente = parseInt(req.params.id_cliente)
    let  body =req.body

    let resultado = validacionParcial(body)
    if(resultado.error) {
        return res.status(400).json({"mensaje":JSON.parse(resultado.error.message)})
    }
    console.log(resultado)
    //console.log( idCliente, "tipo`de datos que viaja `por la url")
    //console.log(idCliente, "Esta es la nueva variable")
    let listClientes = clientes
    
    for(let i= 0; i < listClientes.length; i++) {

        if(listClientes[i].id === idCliente){
            let actualizacion = {
                ...listClientes[i],
                ...body
            }
            clientes.splice(i, 1, actualizacion)
            
            return res.status(204).json(actualizacion)
        }
    }

    res.status(404).json({"message": "el cliente no existe"})
})

app.post("/cliente", (req, res) => {

    let body = req.body
    let resultado = validacionCompleta(body)
    if(resultado.error) {
        return res.status(400).json({"mensaje":JSON.parse(resultado.error.message)})
    }

    let nuevo = {
        "id":clientes.length+1,
        ...resultado.data
    }

    //clientes.splice(clientes.length-1,0,nuevo)
    clientes.push(nuevo)

    res.status(201).json({"mensaje":nuevo})
})



app.listen(PUERTO, () => {
    console.log('Servidor andando')
    console.log(`http://localhost:${PUERTO}`)
})