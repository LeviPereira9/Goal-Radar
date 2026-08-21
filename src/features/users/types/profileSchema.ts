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

export const profileSchema = z
    .object({
        profilePicture: z.string().optional(),
        bio: z.string().max(300, "A bio deve ter no máximo 300 caracteres").optional(),
        dateOfBirth: z.string().min(1, "Informe sua data de nascimento"),
    })
    .refine((data) => calculateAge(new Date(data.dateOfBirth)) >= MINIMUM_AGE,{
        error: "Você precisa ter pelo menos 18 anos para se cadastrar",
        path: ["dateOfBirth"],
    });

export type ProfileFormData = z.infer<typeof profileSchema>