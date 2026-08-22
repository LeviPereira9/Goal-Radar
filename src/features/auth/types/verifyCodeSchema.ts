import {z} from "zod";

export const verifyCodeSchema = z.object({
    code: z.string().min(6, "Informe o código recebido por e-mail"),
});

export type VerifyCodeFormData = z.infer<typeof verifyCodeSchema>;