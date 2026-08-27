import { hasElevatedPrivileges } from "@/shared/lib/rbac";
import type { UserShortProfile } from "../../types/user";
import { Card } from "@/shared/components/Card/Card";
import styles from "./ProfileViews.module.css";
import { UserAvatar } from "@/shared/components/UserAvatar/UserAvatar";

interface ProfileReadOnlyProps {
    profile: UserShortProfile;
}

export function ProfileReadOnly({profile}: ProfileReadOnlyProps){
    return (
        <div className={styles.wrapper}>
            <Card className={styles.card}>
                <UserAvatar
                    src={profile.profilePicture}
                    username={profile.username}
                    size="lg"
                />
                <h1 className={styles.username} >{profile.username}</h1>
                {profile.bio && <p className={styles.bio} >{profile.bio}</p>}
                <p className={styles.meta} >Membro desde {new Date(profile.createdAt).toLocaleDateString("pt-BR")}</p>
                {hasElevatedPrivileges(profile.role) &&
                    <p>Cargo: {profile.role}</p>
                }
            </Card>
        </div>
    )
}