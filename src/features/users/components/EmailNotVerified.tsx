import { useResendVerificationEmail } from "../hooks/useResendVerificationEmail";

interface EmailNotVerifiedProps{
    username: string;
}

export function EmailNotVerified({username}: EmailNotVerifiedProps){
    const resendVerification = useResendVerificationEmail(username);

    return (
        <div>
            <h1>Alterar e-mail</h1>
            <p>Você precisa verificar seu e-mail atual antes de poder alterá-lo.</p>
            <button
                onClick={() => resendVerification.mutate()}
                disabled={resendVerification.isPending}
            >
                {resendVerification.isPending ? "Enviando..." : "Reenviar e-mail de verificação"}
            </button>
            {resendVerification.isSuccess && 
                <p role="status" >E-mail de verificação reenviado..</p>
            }
        </div>
    )
}