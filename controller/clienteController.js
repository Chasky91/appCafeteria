import clientes from "../db/local/clientes.js"
import {validacionCompleta, validacionParcial} from "../validadores/schemaCliente.js"


export const obtenerClientes = (req, res) => {
    let listadoClientes = clientes
    res.json(   listadoClientes)
}
export const obtenerUnCliente = (req, res) => {

    console.log("obtener un cliente");
    
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
}

export const crearCliente = (req, res) => {
    console.log("Crea cliente");
    
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
}

export const actualizarCliente  = (req, res) => {
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
}

export const eliminarCliente = (req, res) => {

    let id = parseInt(req.params.id_cliente)
    let index = clientes.findIndex(e => e.id ===id)
    if(index ===-1) return res.json({"mensaje": "El cliente no existe"})
    clientes.splice(index,1)
    res.json({"message": "Cliente eliminado"})
}




