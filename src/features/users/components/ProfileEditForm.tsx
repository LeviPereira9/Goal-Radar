import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ProfileFormData, profileSchema } from "../types/profileSchema";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import type { UserProfile } from "../types/user";
import { ApiErrorDisplay } from "@/shared/components/ApiErrorDisplay";

interface ProfileEditFormProps {
    profile: UserProfile;
    isSelf: boolean;
    onDone: () => void;
}

export function ProfileEditForm({profile, isSelf, onDone }: ProfileEditFormProps){
    const updateProfile = useUpdateProfile(profile.username);

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues:{
            profilePicture: profile.profilePicture ?? "",
            bio: profile.bio ?? "",
            dateOfBirth: profile.dateOfBirth ?? "",
        },
    });

    const onSubmit = (data: ProfileFormData) => {
        console.log("CHAMOU", data)
        
        updateProfile.mutate(data, {
            onSuccess: () => {
                onDone();
            }
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            {!isSelf && (
                <p role="status">
                    Você está editando o perfil de <span>{profile.username}</span> com privilégios administrativos.
                </p>
            )}

            <h1>Editar perfil</h1>

            <div>
                <label htmlFor="bio">Bio</label>
                <textarea id="bio" {...register("bio")}/>
                {errors.bio && <span>{errors.bio.message}</span> }
            </div>

            <div>
                <label htmlFor="dateOfBirth">Data de nascimento</label>
                <input 
                    id="dateOfBirth"
                    type="date"
                    {...register("dateOfBirth")}
                />
                {errors.dateOfBirth && <span>{errors.dateOfBirth.message}</span> }
            </div>

            <div>
                <label htmlFor="profilePicture">URL da foto de perfil</label>
                <input
                    type="text"
                    id="profilePicture"
                    {...register("profilePicture")}
                />
            </div>

            {updateProfile.isSuccess && <p role="status">Perfil atualizado com sucesso</p> }
            {updateProfile.isError && 
                <ApiErrorDisplay error={updateProfile.error} fallbackMessage="Não foi possível atualizar sua conta"/>
            }

            <button
                type="submit"
                disabled={updateProfile.isPending}
                >
                    {updateProfile.isPending ? "Salvando..." : "Salvar alterações"}
            </button>
            <button 
                type="button"
                disabled={updateProfile.isPending}
                onClick={onDone}
            > 
                Cancelar
            </button>
            
        </form>
    )
}