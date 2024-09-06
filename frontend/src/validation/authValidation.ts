import * as z from 'zod';

export const registerSchema = z.object({
  name: z.string().min(1, "El nombre de Usuario es requerido"),
  password: z.string().min(6, "Al menos 6 caracteres"),
  repeatPassword: z.string().min(1, "Repetir Contraseña es requerido"),
})
  .refine((data) => data.password === data.repeatPassword, {
    message: "Las contrasenias no coinciden",
    path: ["repeatPassword"],
  });

export const loginSchema = z.object({
  username: z.string().min(1, "El nombre de Usuario es requerido"),
  password: z.string().min(6, "Campo requerido"),
});
