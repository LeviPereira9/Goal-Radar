import { hasElevatedPrivileges } from "@/shared/lib/rbac";
import type { UserProfile } from "../../types/user";
import styles from "./ProfileViews.module.css";
import { Card } from "@/shared/components/Card/Card";
import { Button } from "@/shared/components/Button/Button";
import { Link } from "react-router-dom";
import { UserAvatar } from "@/shared/components/UserAvatar/UserAvatar";

interface ProfileDetailsViewProps {
    profile: UserProfile;
    isSelf: boolean;
    onEdit: () => void;
}

export function ProfileDetailsView({profile, isSelf, onEdit}: ProfileDetailsViewProps) {
    return (
        <div className={styles.wrapper}>
            <Card className={styles.card}>
                {!isSelf && (
                    <p role="status" className={styles.adminNotice} >
                        Você está visualizando o perfil de <span className={styles.targetUser} >{profile.username}</span> com privilégios administrativos.
                    </p>
                )}

                <UserAvatar
                    src={profile.profilePicture}
                    username={profile.username}
                    size="lg"
                    />
                <h1 className={styles.username}>{profile.username}</h1>
                {profile.bio &&
                    <p className={styles.bio} >{profile.bio}</p>
                }
            
                <dl className={styles.details}>
                    <div>
                        <dt>E-mail</dt>
                        <dd>{profile.email}</dd>
                    </div>
            
                    <div>
                        <dt>Verificado</dt>
                        <dd>{profile.verified ? "Sim" : "Não"}</dd>
                    </div>
            
                    <div>
                        <dt>Membro desde</dt>
                        <dd>{new Date(profile.createdAt).toLocaleDateString("pt-BR")}</dd>
                    </div>
                    {hasElevatedPrivileges(profile.role) &&
                        <div>
                            <dt>Cargo</dt>
                            <dd>{profile.role}</dd>
                        </div>
                    }
                </dl>
                <div className={styles.actions}>
                    <Button
                        onClick={onEdit}
                    >Editar perfil</Button>
                    {isSelf && (
                        <>
                            <Link to={`/users/${profile.username}/password`}>
                            Alterar senha</Link>
                            <Link to={`/users/${profile.username}/email`}
                            >Alterar e-mail</Link>
                        </>
                    )}
                    <Link to={`/users/${profile.username}/delete`} className={styles.dangerLink}>Desativar conta</Link>
                </div>
            </Card>
        </div>
    )
}