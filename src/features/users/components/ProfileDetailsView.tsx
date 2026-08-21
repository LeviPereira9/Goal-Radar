import { hasElevatedPrivileges } from "@/shared/lib/rbac";
import type { UserProfile } from "../types/user";

interface ProfileDetailsViewProps {
    profile: UserProfile;
    isSelf: boolean;
    onEdit: () => void;
}

export function ProfileDetailsView({profile, isSelf, onEdit}: ProfileDetailsViewProps) {
    return (
        <div>
            {!isSelf && (
                <p role="status">
                    Você está visualizando o perfil de <span>{profile.username}</span> com privilégios administrativos.
                </p>
            )}
            
            <h1>{profile.username}</h1>
            {profile.bio && <p>{profile.bio}</p> }
            <p>E-mail: {profile.email}</p>
            <p>Verificado: {profile.verified ? "Sim" : "Não"}</p>
            <p>Nascimento: {new Date(profile.dateOfBirth).toLocaleDateString("pt-BR")}</p>
            <p>Membro desde {new Date(profile.createdAt).toLocaleDateString("pt-BR")}</p>
            {hasElevatedPrivileges(profile.role) && 
                <p>Cargo: {profile.role}</p>
            }

            <button onClick={onEdit}>Editar perfil</button>
        </div>
    )
}