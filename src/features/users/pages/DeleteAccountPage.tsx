import { useParams, useNavigate } from "react-router-dom";
import { useMe } from "@/features/auth/hooks/useMe";
import { useDeleteAccount } from "../hooks/useDeleteAccount";
import { isSelf as checkIsSelf } from "@/shared/lib/rbac";
import { ApiErrorDisplay } from "@/shared/components/ApiErrorDisplay";

export function DeleteAccountPage(){
    const {username} = useParams<{username: string}>();
    const {data: currentUser} = useMe();
    const navigate = useNavigate();
    const deleteAccount = useDeleteAccount(username!);

    const isSelf = !!currentUser && !!username && checkIsSelf(currentUser.username, username);

    const handleDelete = () => {
        const confirmed = window.confirm(
            isSelf
            ? "Tem certeza que deseja desativar sua conta? Essa ação não pode ser desfeita."
            : `Tem certeza que deseja desativar a cnta de ${username}?`
        );

        if(!confirmed) return;

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
        <div>
            <h1>Desativar conta</h1>
            <p>
                {isSelf 
                ? "Ao desativar usa conta, você perderá o acesso ao sistema."
                : `Você está prestes a desativar a conta de ${username}.`
            }
            </p>

            {deleteAccount.isError && (
                <ApiErrorDisplay
                    error={deleteAccount.error}
                    fallbackMessage="Não foi possível deletar a conta"
                />
            )}
            
            <button onClick={handleDelete} disabled={deleteAccount.isPending} >
                {deleteAccount.isPending ? "Desativando..." : "Desativar conta"}
            </button>
            
        </div>
    )
}