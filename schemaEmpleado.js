import z from "zod"

const empleadoSchema = z.object({
    nombre: z.string({
        invalid_type_error:"el nombre del empleado solo debe ser  un string",
        required_error:"El nombre del empleado es requerido"
    }),
    apellido: z.string({
        invalid_type_error:"el apellido del empleado solo debe ser  un string",
        required_error:"El nombre del empleado es requerido"
    }),
    puesto: z.string({
        invalid_type_error:"el puesto del empleado solo debe ser  un string",
    }),
    huella: z.string({
        invalid_type_error:"La huella del empleado solo debe ser  un string",
    }),
    horarioDeEntrada:z.string().time({
        invalid_type_error:"El horario de entrada del empleado solo puede ser en formato HH:MM:SS",
        required_error:"El horario de entrada es requerido"
    }),
    horarioDeSalida:z.string().time({
        invalid_type_error:"El horario de salida del empleado solo puede ser en formato HH:MM:SS",
        required_error:"El horario de salida es requerido"
    })

})

const validacionCompleta  = (cli) => {
    return empleadoSchema.safeParse(cli)
}

const validacionParcial  = (cli) => {
    return empleadoSchema.partial().safeParse(cli)
}
export { validacionCompleta, validacionParcial}
