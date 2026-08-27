import { useParams, useNavigate } from "react-router-dom";
import { useMe } from "@/features/auth/hooks/useMe";
import { useDeleteAccount } from "../hooks/useDeleteAccount";
import { isSelf as checkIsSelf } from "@/shared/lib/rbac";
import { ApiErrorDisplay } from "@/shared/components/ApiErrorDisplay";
import { UserActionLayout } from "../components/UserActionLayout/UserActionLayout";
import { Button } from "@/shared/components/Button/Button";
import { useState } from "react";
import { Drawer } from "@/shared/components/Drawer/Drawer";

export function DeleteAccountPage(){
    const {username} = useParams<{username: string}>();
    const {data: currentUser} = useMe();
    const navigate = useNavigate();
    const deleteAccount = useDeleteAccount(username!);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const isSelf = !!currentUser && !!username && checkIsSelf(currentUser.username, username);

    const handleConfirm = () => {
        deleteAccount.mutate(
            {isSelf},
            {
                onSuccess: () => {
                    navigate(isSelf ? "/login" : "/",
                        {replace: true}
                    );
                }
            }
        )
    }
    
    return (
        <UserActionLayout
            title="Desativar a conta"
            description={
                isSelf
                ? "Ao desativar sua conta, você perderá o acesso ao sistema."
                : `Você está prestes a desativar a conta de ${username}.`
            }
        >
            {deleteAccount.isError && (
                <ApiErrorDisplay
                    error={deleteAccount.error}
                    fallbackMessage="Não foi possível deletar a conta"
                />
            )}
            
            <Button 
                variant="danger"
                onClick={() => setIsConfirmOpen(true)}>
                Desativar conta
            </Button>

            <Drawer
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                title="Confirmar desativação"
            >
                <p>
                    {isSelf
                        ? "Tem certeza que deseja desativar sua conta? Essa ação não pode ser desfeita"
                        : `Tem certeza que deseja desativar a conta de ${username}?`
                    }
                </p>
                <div style={{ display: 'flex', gap: 'var(--spacing-sm)', marginTop: 'var(--spacing-lg)' }}>
                    <Button
                        variant="danger"
                        onClick={handleConfirm}
                        disabled={deleteAccount.isPending}
                    >
                        {deleteAccount.isPending ? "Desativando..." : "Sim, desativar"}
                    </Button>
                </div>
            </Drawer>
        </UserActionLayout>
    )
}