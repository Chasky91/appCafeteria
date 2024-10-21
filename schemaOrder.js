import z from "zod"

const shcemaOrden = z.object({
    fecha: z.string().date({
        required_error:"La fecha es requerida"
    }),
    items: z.array(z.number()).nonempty(),
    mesa: z.number({
        invalid_type_error:"la mesa debe ser un numero",
        required_error:"La mesa es requerida"
    }),
    cliente: z.number({
        invalid_type_error:"La El cliente deber ser un cliente valiudo ",
        required_error:"El cliente es requerido"

    }),
    estado:z.string({
        invalid_type_error:"El estado debe ser un string",
        required_error:"El estado es requerido"
    }),
    total:z.number().positive({
        invalid_type_error:"El total debe ser un  numero",
        required_error:"El  el total es requerido"
    })

})

const validacionCompleta  = (empl) => {
    return shcemaOrden.safeParse(empl)
}

const validacionParcial  = (empl) => {
    return shcemaOrden.partial().safeParse(empl)
}
export { validacionCompleta, validacionParcial}


