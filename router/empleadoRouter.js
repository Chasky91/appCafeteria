import { Router } from "express";
import { actualizarEmpleado, crearEmpleado, eliminarEmpleado, obtenerEmpleados, obtenerPorIdEmpleado } from "../controller/empleadoController.js";

export const empleadoRouter = Router()


empleadoRouter.get("/", obtenerEmpleados)
empleadoRouter.get("/:id_empl",obtenerPorIdEmpleado)
empleadoRouter.post("/",crearEmpleado)
empleadoRouter.put("/:id_empl", actualizarEmpleado)
empleadoRouter.delete("/:id_empl", eliminarEmpleado)

