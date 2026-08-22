import { z } from 'zod';

export const emailSchema = z.object(
    {
        newEmail: z.email("Informe um e-mail válido"),
    }
);

export type EmailFormData = z.infer<typeof emailSchema>;