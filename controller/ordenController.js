import { validacionCompleta as valOrden, validacionCompleta as valOrdenParcial } from "../validadores/schemaOrder.js"
import { ordenes } from "../db/local/ordenes.js"

export const obtenerOrdenes = (req, res) => {
    res.json(  ordenes)
}

export const obtenerPoIdOrden = (req, res) => {
    let id = parseInt(req.params.id)
    let resultado = ordenes.find(e => e.idOrden ===id)
    if(resultado) return res.json({"mensaje":resultado})
    res.status(404).json({"message": "La orden no existe no existe"})
}


export const creaOrden = (req, res) => {
    let body = req.body
    let resultado = valOrden(body)
    if(resultado.error) return res.status(404).json({"message": JSON.parse(resultado.error.message)})
    
    let nuevo = {
        "id":ordenes.length+1,
        ...resultado.data
    }

    ordenes.push(nuevo)
    res.status(201).json({"message": nuevo})
}

export const actualizarOrden = (req, res) => {
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

    ordenes.splice(indice,1,modificacion)
    res.status(404).json({"message": ordenes[indice]})
}


export const eliminarOrden = (req, res) => {
    let id = parseInt(req.params.id)
    let index = ordenes.findIndex(e => e.idOrden ===id)
    if(index ===-1) return res.json({"mensaje": "La orden no existe no existe"})
    ordenes.splice(index,1)
    res.json({"message": "Orden eliminada "})
}

