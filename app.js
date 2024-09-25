import express from "express"
import clientes from "./clientes.js"
import { corsCafe } from "./corsWebCafe.js"

const app = express()
app.use(express.json())
app.use(corsCafe()); 
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

    let bodyCliente = req.body

    let  idCliente = clientes.length
    idCliente++

    let newCliente = {
        ...{"id":idCliente}, 
        ...bodyCliente
    }
    clientes.push(newCliente)
    
    res.json({"message ": `nuevo cliente registrado ${idCliente}`})
})

app.put("/cliente/:id_cliente", (req, res) => {

    let idCliente = parseInt(req.params.id_cliente)
    let bodyClienteModf = req.body


    for(let i= 0; i < clientes.length; i++) {

        if(clientes[i].id === idCliente){
            let clienteModificado  = {
                ...{"id": clientes[i].id},
                ...bodyClienteModf
            }
            clientes[i] =  clienteModificado
            console.log(clientes)
            return res.json({"message":`El cliente ${clientes[i].id} ha sido actualizado correctamente`})
        }
    }


    res.json({"message":"El cliente que intenta actualizar no existe"})
})

app.delete("/cliente/:id_cliente", (req, res) => {
    console.log("eliminar");
    

    let idCliente = parseInt(req.params.id_cliente)


    for(let i= 0; i < clientes.length; i++) {

        if(clientes[i].id === idCliente){
            let id =  clientes[i].id
            clientes.splice(i,1)
            return res.json({"message":`El cliente ${id} ha sido eliminado correctamente`})
        }
    }

    res.json({"message":"El cliente que intenta eliminar no existe"})
})


app.listen(PUERTO, () => {
    console.log('corriendo por el puerto ', PUERTO)
})