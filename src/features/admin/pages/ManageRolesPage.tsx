import { useState } from "react";
import { UserRoleSearch } from "../components/UserRoleSearch";
import { RoleChangeForm } from "../components/RoleChangeForm";
import type { UserShortProfile } from "@/features/users/types/user";

export function ManageRolesPage(){

    const [selectedUser, setSelectedUser] = useState<UserShortProfile | null>(null);
    
    return (
        <div>
            <h1>Gerenciar cargos</h1>

            {selectedUser ? (
                <>
                    <RoleChangeForm
                        targetUser={selectedUser}
                        onDone={() => setSelectedUser(null)}
                    />
                    <button
                        onClick={() => setSelectedUser(null)}
                    >Buscar outro usuário</button>
                </>
            ):(
                <UserRoleSearch onSelect={setSelectedUser} />
            )}
        </div>
    )
}