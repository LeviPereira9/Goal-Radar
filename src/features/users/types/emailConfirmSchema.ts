import { z } from "zod";

export const emailConfirmSchema = z.object({
    code: z.string().min(1, "Informe o código recebido por e-mail"),
});

export type EmailConfirmFormData = z.infer<typeof emailConfirmSchema>;