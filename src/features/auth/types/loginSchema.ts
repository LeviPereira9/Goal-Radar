import { z } from 'zod';

export const loginSchema = z.object({
    login: z.string().min(1, "Informe seu usuário ou e-mail"),
    password: z.string().min(1, "Informe sua senha"),
});

export type LoginFormData = z.infer<typeof loginSchema>