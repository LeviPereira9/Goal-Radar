import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ProfileFormData, profileSchema } from "../../types/profileSchema";
import { useUpdateProfile } from "../../hooks/useUpdateProfile";
import type { UserProfile } from "../../types/user";
import { ApiErrorDisplay } from "@/shared/components/ApiErrorDisplay";
import styles from "./ProfileViews.module.css";
import { Card } from "@/shared/components/Card/Card";
import { StatusMessage } from "@/shared/components/StatusMessage/StatusMessage";
import { TextField } from "@/shared/components/TextField/TextField";
import { Button } from "@/shared/components/Button/Button";
import { UserAvatar } from "@/shared/components/UserAvatar/UserAvatar";

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
        updateProfile.mutate(data, {
            onSuccess: () => {
                onDone();
            }
        });
    };

    return (
        <div className={styles.wrapper}>
            
            <Card className={styles.card}>
                {!isSelf && (
                    <StatusMessage type="warning">
                        Você está editando o perfil de <strong>{profile.username}</strong> com privilégios administrativos.
                    </StatusMessage>
                )}
                    
                <h1 className={styles.username} >Editar perfil</h1>

                <UserAvatar
                    src={profile.profilePicture}
                    username={profile.username}
                    size="lg"
                />

                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label="Bio"
                        type="text"
                        {...register("bio")}
                        error={errors.bio?.message}
                        placeholder={profile.bio}
                    />
                    
                    
                    <TextField
                        label="Data de nascimento"
                        type="date"
                        {...register("dateOfBirth")}
                        error={errors.dateOfBirth?.message}
                    />
                    
                    <TextField
                        label="URL da foto de perfil"
                        type="text"
                        {...register("profilePicture")}
                        error={errors.profilePicture?.message}
                    />
                    
                    {updateProfile.isSuccess && <p role="status">Perfil atualizado com sucesso</p> }
                    {updateProfile.isError &&
                        <ApiErrorDisplay error={updateProfile.error} fallbackMessage="Não foi possível atualizar sua conta"/>
                    }


                    <div className={styles.formActions}>
                        <Button
                            type="submit"
                            disabled={updateProfile.isPending}
                            >
                                {updateProfile.isPending ? "Salvando..." : "Salvar alterações"}
                        </Button>
                        <Button
                            type="button"
                            disabled={updateProfile.isPending}
                            onClick={onDone}
                        >
                            Cancelar
                        </Button>
                    </div>
                
                </form>
            </Card>
        </div>
    )
}