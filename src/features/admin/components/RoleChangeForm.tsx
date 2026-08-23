import { useState } from "react"; 
import { useMe } from "@/features/auth/hooks/useMe";
import { useRoles } from "../hooks/useRoles";
import { useModifyRole } from "../hooks/useModifyRole";
import { canModifyRole } from "@/shared/lib/rbac";
import { ApiErrorDisplay } from "@/shared/components/ApiErrorDisplay";
import type { UserShortProfile } from "@/features/users/types/user";
import { Role } from "@/shared/types";

interface RoleChangeFormProps {
    targetUser: UserShortProfile;
    onDone: () => void;
}

export function RoleChangeForm({targetUser, onDone}: RoleChangeFormProps){
    const { data: currentUser } = useMe();
    const { data: rolesData } = useRoles();
    const modifyRole = useModifyRole(targetUser.username);
    const [selectedRole, setSelectedRole] = useState<Role>(Role.USER);

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
        <form onSubmit={handleSubmit}>
            <h2>
                Alterar cargo de {targetUser.username} (atual: {targetUser.role})
            </h2>

            {!canModifyThisUser ? (
                <p>Você não têm permissão para alterar o cargo deste usuário.</p>
            ):(
                <>
                {assignableRoles.length === 0 ? (
                <p>Você não têm permissão para atribuir nenhum cargo a este usuário.</p>
                ):(
                    <>
                        <select
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value as Role)}
                        >
                            {assignableRoles.map((role) => (
                                <option key={role} value={role}>
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

                        <button
                            type="submit"
                            disabled={!selectedRole || modifyRole.isPending}
                        >
                            {modifyRole.isPending ? "Salvando..." : "Salvar"}
                        </button>
                        
                    </>
                )}
                </>
            )}
        </form>
    )
}