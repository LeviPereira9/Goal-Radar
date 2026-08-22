import { z } from "zod";

export const forgotPasswordSchema = z.object({
    username: z.string().min(1, "Informe seu usuário"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;