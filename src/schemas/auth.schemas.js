import { z } from 'zod';

export const registerSchema = z.object({
    nombre: z.string({
        required_error: "Nombre requerido"
    }),
    email: z.string({
        required_error: "Email requerido"
    }).email({
        message: "email invalido"
    }),
    contrasena: z.string({
        required_error: "Contraseña requerida"
    }).min(8, {
        message: "La contraseña debe de tener al menos 8 caracteres"
    }),

})

export const loginSchema = z.object({
    email: z.string({
        required_error: "Email requerido"
    }).email({
        message: "email no valido"
    }),
    contrasena: z.string({
        required_error: "Contraseña requerida"
    }).min(8, {
        message: "La contraseña debe de tener al menos 8 caracteres"
    })
})