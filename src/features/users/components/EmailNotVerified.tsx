import { useNavigate } from "react-router-dom"; 
import { useResendConformation } from "@/features/auth/hooks/useAccountVerification";
import styles from "./User.module.css";
import { Button } from "@/shared/components/Button/Button";
import { showToast } from "@/shared/lib/notifications/toastBus";
import sharedStyles from "@/shared/styles/shared.module.css";

interface EmailNotVerifiedProps{
    username: string;
}

export function EmailNotVerified({username}: EmailNotVerifiedProps){
    const navigate = useNavigate();
    const resendConfirmation = useResendConformation(username);

    const handleResend = () => {
        resendConfirmation.mutate(undefined, {
            onSuccess: () => {
                showToast("E-mail de verificação reenviado", "success");
                navigate("/verify-account")
            },
        })
    }
    
    return (
        <div>
            <p className={styles.warn}>Você precisa verificar seu e-mail atual antes de poder alterá-lo.</p>
            <div className={sharedStyles.center} >
                <Button
                    onClick={handleResend}
                    disabled={resendConfirmation.isPending}
                >
                    {resendConfirmation.isPending ? "Enviando..." : "Reenviar e-mail de verificação"}
                </Button>
            </div>
        </div>
    )
}