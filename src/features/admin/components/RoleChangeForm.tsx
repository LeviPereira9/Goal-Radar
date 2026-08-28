import { useState } from "react"; 
import { useMe } from "@/features/auth/hooks/useMe";
import { useRoles } from "../hooks/useRoles";
import { useModifyRole } from "../hooks/useModifyRole";
import { canModifyRole } from "@/shared/lib/rbac";
import { ApiErrorDisplay } from "@/shared/components/ApiErrorDisplay";
import type { UserShortProfile } from "@/features/users/types/user";
import { Role } from "@/shared/types";
import styles from "./RoleChangeForm.module.css";
import { StatusMessage } from "@/shared/components/StatusMessage/StatusMessage";
import { Button } from "@/shared/components/Button/Button";

interface RoleChangeFormProps {
    targetUser: UserShortProfile;
    onDone: () => void;
}

export function RoleChangeForm({targetUser, onDone}: RoleChangeFormProps){
    const { data: currentUser } = useMe();
    const { data: rolesData } = useRoles();
    const modifyRole = useModifyRole(targetUser.username);
    const [selectedRole, setSelectedRole] = useState<Role | "">("");

    if(!currentUser || !rolesData){
        return <p>Carregando...</p>
    }

    const canModifyThisUser = canModifyRole(currentUser.role, targetUser.role);
    const assignableRoles = canModifyThisUser
    ? rolesData.roles.filter((role) => canModifyRole(currentUser.role, role))
    : [];
    
    const handleSubmit = (e: React.SubmitEvent) => {

        e.preventDefault();

        if(!selectedRole) return;
        modifyRole.mutate(selectedRole, { onSuccess: onDone });
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form} >
            <h2 className={styles.title} >
                Alterar cargo de <strong>{targetUser.username}</strong>
            </h2>
            <p className={styles.currentRole}>Cargo atual: {targetUser.role}</p>

            {!canModifyThisUser ? (
                <StatusMessage type="warning">
                    Você não têm permissão para alterar o cargo deste usuário.
                </StatusMessage>
            ): assignableRoles.length === 0 ? (
                <StatusMessage type="warning">Você não têm permissão para atribuir nenhum cargo a este usuário.</StatusMessage>
            ):(
                <>
                    <select
                        className={styles.select}
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value as Role)}
                    >
                        <option value="">Selecione um cargo</option>
                        {assignableRoles.map((role) => (
                            <option
                                key={role}
                                value={role}
                            >
                                {role}
                            </option>
                        ))}
                    </select>

                    {modifyRole.isError && (
                        <ApiErrorDisplay
                            error={modifyRole.error}
                            fallbackMessage="Não foi possível alterar o cargo"
                        />
                    )}

                    <div className={styles.center}>
                        <Button
                            type="submit"
                            disabled={!selectedRole || modifyRole.isPending}
                        >
                            {modifyRole.isPending ? "Salvando..." : "Salvar"}
                        </Button>
                    </div>
                    
                </>
            )}
        </form>
    )
}