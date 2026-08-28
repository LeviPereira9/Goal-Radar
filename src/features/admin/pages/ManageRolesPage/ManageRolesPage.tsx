import { useState } from "react";
import { UserRoleSearch } from "../../components/UserRoleSearch/UserRoleSearch";
import { RoleChangeForm } from "../../components/RoleChangeForm";
import type { UserShortProfile } from "@/features/users/types/user";
import styles from "./ManageRolesPage.module.css";
import { Card } from "@/shared/components/Card/Card";
import { Button } from "@/shared/components/Button/Button";

export function ManageRolesPage(){

    const [selectedUser, setSelectedUser] = useState<UserShortProfile | null>(null);
    
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Gerenciar cargos</h1>

            <Card className={styles.card} >
                {selectedUser ? (
                    <>
                        <RoleChangeForm
                            targetUser={selectedUser}
                            onDone={() => setSelectedUser(null)}
                        />
                        <div className={styles.returnButton}>
                            <Button
                                variant="ghost"
                                onClick={() => setSelectedUser(null)}
                            >Buscar outro usuário</Button>
                        </div>
                    </>
                ):(
                    <UserRoleSearch onSelect={setSelectedUser} />
                )}
            </Card>
        </div>
    )
}