import { Router } from "express"
import { actualizarCliente, crearCliente, eliminarCliente, obtenerClientes, obtenerUnCliente } from "../controller/clienteController.js"

export const clienteRouter = Router()

clienteRouter.get("/", obtenerClientes) 
clienteRouter.get("/:id_cliente", obtenerUnCliente)
clienteRouter.post("/", crearCliente)
clienteRouter.put("/:id_cliente", actualizarCliente)
clienteRouter.delete("/:id_cliente", eliminarCliente)