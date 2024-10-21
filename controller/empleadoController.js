import { validacionCompleta as validaEmpCom  } from "../schemaEmpleado.js"
import { empleados } from "../empleados.js"


export const obtenerEmpleados = (req, res)=> {
    res.json({"message":empleados})
}


export const obtenerPorIdEmpleado = (req, res)=> {
    let id = parseInt(req.params.id_empl)
    let resultado = empleados.find(e => e.idEmpleado ===id)
    if(resultado) return res.json({"mensaje":resultado})
    res.status(404).json({"message": "El empleado no existe"})
}


export const actualizarEmpleado = (req, res)=> {
    let id = parseInt(req.params.id_empl)
    let body = req.body
    
    let indice = empleados.findIndex(e => e.idEmpleado ===id)
    if(indice === -1) return res.status(404).json({"message": "El empleado no existe" })
    
    let modificacion = {
        ...empleados[indice],
        "nombre":body.nombre,
        "apellido":body.apellido
    }

    empleados.splice(indice,1,modificacion)
    res.status(404).json({"message": empleados[indice]})
}


export const crearEmpleado = (req, res)=> {
    
    let body = req.body
    let resultado = validaEmpCom(body)
    if(resultado.error) return res.status(404).json({"message": JSON.parse(resultado.error.message)})
    
    let nuevo = {
        "id":empleados.length+1,
        ...resultado.data
    }

    empleados.push(nuevo)
    res.status(201).json({"message": nuevo})

}


export const eliminarEmpleado = (req, res)=> {
    let id = parseInt(req.params.id_empl)
    let index = empleados.findIndex(e => e.idEmpleado ===id)
    if(index ===-1) return res.json({"mensaje": "El empleado no existe"})
    empleados.splice(index,1)
    res.json({"message": "Empleado eliminado"})
}






