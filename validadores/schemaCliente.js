import z from "zod"

const clienteSchema = z.object({
    nombre: z.string({
        invalid_type_error:"el nobre del cliente solo debe ser  un string",
        required_error:"El nombre del cliente es requerido"
    }),
    apellido: z.string({
        invalid_type_error:"el nobre del cliente solo debe ser  un string",
        required_error:"El nombre del cliente es requerido"
    }),
    cargo: z.string({
        invalid_type_error:"el nobre del cliente solo debe ser  un string",
    }),
    email:z.string({
        required_error:"el email es requerido"
    }).email({ message: "Email invalido " })

})

const validacionCompleta  = (cli) => {
    return clienteSchema.safeParse(cli)
}

const validacionParcial  = (cli) => {
    return clienteSchema.partial().safeParse(cli)
}
export { validacionCompleta, validacionParcial}
