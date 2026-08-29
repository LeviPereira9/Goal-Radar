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
import { LoadingState } from "@/shared/components/LoadingState/LoadingState";
import { ErrorState } from "@/shared/components/ErrorState/ErrorState";

interface RoleChangeFormProps {
    targetUser: UserShortProfile;
    onDone: () => void;
}

export function RoleChangeForm({targetUser, onDone}: RoleChangeFormProps){
    const { data: currentUser, isLoading: userLoading } = useMe();
    const { data: rolesData, isLoading: rolesLoading } = useRoles();
    const modifyRole = useModifyRole(targetUser.username);
    const [selectedRole, setSelectedRole] = useState<Role | "">("");

    if(userLoading || rolesLoading){
        return <LoadingState/>
    }

    if(!currentUser || !rolesData){
        return <ErrorState/>
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
                            isLoading={!selectedRole || modifyRole.isPending}
                        >
                            {modifyRole.isPending ? "Salvando..." : "Salvar"}
                        </Button>
                    </div>
                    
                </>
            )}
        </form>
    )
}