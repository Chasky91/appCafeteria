import { Router } from "express";
import { actualizarOrden, creaOrden, eliminarOrden, obtenerOrdenes, obtenerPoIdOrden } from "../controller/ordenController.js"


export const ordenRouter = Router()

ordenRouter.get("/", obtenerOrdenes)
ordenRouter.get("/:id", obtenerPoIdOrden)
ordenRouter.post("/",creaOrden)
ordenRouter.put("/:id", actualizarOrden)
ordenRouter.delete("/:id", eliminarOrden)
