import { useNavigate } from "react-router-dom"; 
import { useResendConformation } from "@/features/auth/hooks/useAccountVerification";

interface EmailNotVerifiedProps{
    username: string;
}

export function EmailNotVerified({username}: EmailNotVerifiedProps){
    const navigate = useNavigate();
    const resendConfirmation = useResendConformation(username);

    const handleResend = () => {
        resendConfirmation.mutate(undefined, {
            onSuccess: () => navigate("/verify-account"),
        })
    }
    
    return (
        <div>
            <h1>Alterar e-mail</h1>
            <p>Você precisa verificar seu e-mail atual antes de poder alterá-lo.</p>
            <button
                onClick={handleResend}
                disabled={resendConfirmation.isPending}
            >
                {resendConfirmation.isPending ? "Enviando..." : "Reenviar e-mail de verificação"}
            </button>
            {resendConfirmation.isSuccess && 
                <p role="status" >E-mail de verificação reenviado..</p>
            }
        </div>
    )
}