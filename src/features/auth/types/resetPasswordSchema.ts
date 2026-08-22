import { z } from "zod";

export const resetPasswordSchema = z
    .object({
        code: z.string().min(1, "Informe o código recebido por e-mail"),
        newPassword: z.string().min(8, "A nova senha deve ter no mínimo 8 caracteres"),
        confirmNewPassword: z.string().min(1, "Confirme sua nova senha"),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        message: "As senhas não coicidem",
        path: ["confirmNewPassword"],
    })

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;