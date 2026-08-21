import { hasElevatedPrivileges } from "@/shared/lib/rbac";
import type { UserShortProfile } from "../types/user";

interface ProfileReadOnlyProps {
    profile: UserShortProfile;
}

export function ProfileReadOnly({profile}: ProfileReadOnlyProps){
    return (
        <div>
            <h1>{profile.username}</h1>
            {profile.bio && <p>{profile.bio}</p>}
            <p>Membro desde {new Date(profile.createdAt).toLocaleDateString("pt-BR")}</p>
            {hasElevatedPrivileges(profile.role) && 
                <p>Cargo: {profile.role}</p>
            }
        </div>
    )
}