import { z } from "zod";

export const codeSchema = z.object({
    code: z.string().min(1, "Informe o código da competição"),
    name: z.string().min(1, "Informe o nome da competição"),
});

export type CodeFormData = z.infer<typeof codeSchema>;