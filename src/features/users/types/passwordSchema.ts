import {z} from "zod";

export const passwordSchema = z
    .object({
        currentPassword: z.string().min(8, "Informe sua senha atual"),
        newPassword: z.string().min(8, "A nova senha deve ter no mínimo 8 caracteres"),
        confirmNewPassword: z.string().min(1, "Confirme sua nova senha"),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        message: "As senhas não coincidem",
        path: ["confirmNewPassword"],
    })
    .refine((data) => data.currentPassword !== data.newPassword, {
        message: "A nova senha deve ser diferente da atual",
        path: ["newPassword"],
    });

export type PasswordFormData = z.infer<typeof passwordSchema>;