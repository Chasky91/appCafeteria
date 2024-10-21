import express, { json } from "express"
import clientes from "./clientes.js"
import { empleados } from "./empleados.js"
import {validacionCompleta, validacionParcial} from "./schemaCliente.js"
import { validacionCompleta as validaEmpCom  } from "./schemaEmpleado.js"
import { validacionCompleta as valOrden, validacionCompleta as valOrdenParcial } from "./schemaOrder.js"
import { ordenes } from "./ordenes.js"


const app = express()
app.use(express.json())
app.disable("x-powered-by")

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

app.get('/empleados', (req, res) => {
    res.json(  empleados)
})

app.put("/empleados/:id_empl", (req, res) =>  {

    let id = parseInt(req.params.id_empl)
    let body = req.body
    console.log(body);
    
    let indice = empleados.findIndex(e => e.idEmpleado ===id)
    if(indice === -1) return res.status(404).json({"message": "El empleado no existe" })
    
    let modificacion = {
        ...empleados[indice],
        "nombre":body.nombre,
        "apellido":body.apellido
    }

    empleados.splice(indice,1,modificacion)
    res.status(404).json({"message": empleados[indice]})
})

app.post("/empleados", (req, res) =>  {

    let body = req.body
    let resultado = validaEmpCom(body)
    console.log(resultado)
    if(resultado.error) return res.status(404).json({"message": JSON.parse(resultado.error.message)})
    
    let nuevo = {
        "id":empleados.length+1,
        ...resultado.data
    }

    empleados.push(nuevo)
    res.status(201).json({"message": nuevo})
})

app.get("/empleados/:id_empl", (req, res) =>  {

    let id = parseInt(req.params.id_empl)
    let resultado = empleados.find(e => e.idEmpleado ===id)
    if(resultado) return res.json({"mensaje":resultado})
    res.status(404).json({"message": "El empleado no existe"})
})

app.delete("/empleados/:id_empl", (req, res) =>  {

    let id = parseInt(req.params.id_empl)
    let index = empleados.findIndex(e => e.idEmpleado ===id)
    if(index ===-1) return res.json({"mensaje": "El empleado no existe"})
    empleados.splice(index,1)
    res.json({"message": "Empleado eliminado"})
})

//CRUD Orden

app.get('/ordenes', (req, res) => {
    res.json(  ordenes)
})

app.get("/ordenes/:id", (req, res) =>  {

    let id = parseInt(req.params.id)
    let resultado = ordenes.find(e => e.idOrden ===id)
    if(resultado) return res.json({"mensaje":resultado})
    res.status(404).json({"message": "La orden no existe no existe"})
})

app.put("/ordenes/:id", (req, res) =>  {

    let id = parseInt(req.params.id)
    let body = req.body
    let resultado = valOrdenParcial(body)
    if(resultado.error) return  res.status(404).json({"message": JSON.parse(resultado) })
    let indice = ordenes.findIndex(e => e.idOrden ===id)

    if(indice === -1) return res.status(404).json({"message": "El empleado no existe" })
    
    let modificacion = {
        ...ordenes[indice],
        ...body
    }

    empleados.splice(indice,1,modificacion)
    res.status(404).json({"message": empleados[indice]})
})

app.post("/ordenes", (req, res) =>  {

    let body = req.body
    let resultado = valOrden(body)
    console.log(resultado)
    if(resultado.error) return res.status(404).json({"message": JSON.parse(resultado.error.message)})
    
    let nuevo = {
        "id":ordenes.length+1,
        ...resultado.data
    }

    ordenes.push(nuevo)
    res.status(201).json({"message": nuevo})
})



app.delete("/ordenes/:id", (req, res) =>  {

    let id = parseInt(req.params.id)
    let index = ordenes.findIndex(e => e.idOrden ===id)
    if(index ===-1) return res.json({"mensaje": "La orden no existe no existe"})
    ordenes.splice(index,1)
    res.json({"message": "Orden eliminada "})
})

app.listen(PUERTO, () => {
    console.log('Servidor andando')
    console.log(`http://localhost:${PUERTO}`)
})