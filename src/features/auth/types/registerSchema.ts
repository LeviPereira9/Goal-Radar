import { z } from "zod";

const MINIMUM_AGE = 18;

function calculateAge(birthDate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

    const hasHadBirthdayThisYear =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

    if(!hasHadBirthdayThisYear){
        age--;
    }

    return age;
}

export const registerSchema = z
    .object({
        username: z.string().min(1, "Informe um nome de usuário"),
        email: z.string().email("Informe um e-mail válido"),
        password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres"),
        confirmPassword: z.string().min(8, "Confirme sua senha"),
        dateOfBirth: z.string().min(1, "Informe sua data de nascimento"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        error: "As senhas não concidem",
        path: ["confirmPassword"],
    })
    .refine((data) => calculateAge(new Date(data.dateOfBirth)) >= MINIMUM_AGE,{
        error: "Você precisa ter pelo menos 18 anos para se cadastrar",
        path: ["dataOfBirth"],
    });

export type RegisterFormData = z.infer<typeof registerSchema>;