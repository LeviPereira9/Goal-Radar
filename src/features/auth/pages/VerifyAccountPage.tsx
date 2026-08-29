import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyCodeSchema, type VerifyCodeFormData } from "../types/verifyCodeSchema";
import { useConfirmAccount, useResendConformation } from "../hooks/useAccountVerification";
import { useMyDetails } from "../hooks/useMyDetails";
import { ApiErrorDisplay } from "@/shared/components/ApiErrorDisplay";
import { AuthLayout } from "../components/AuthLayout";
import { StatusMessage } from "@/shared/components/StatusMessage/StatusMessage";
import { TextField } from "@/shared/components/TextField/TextField";
import { Button } from "@/shared/components/Button/Button";
import sharedStyle from "@/shared/styles/shared.module.css";
import { LoadingState } from "@/shared/components/LoadingState/LoadingState";

export function VerifyAccountPage(){
    const {data: profile, isLoading} = useMyDetails();
    const username = profile?.username ?? "";

    const confirmAccount = useConfirmAccount(username);
    const resendConfirmation = useResendConformation(username);

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<VerifyCodeFormData>({
        resolver: zodResolver(verifyCodeSchema)
    })

    if(isLoading) return <AuthLayout title="Verificar conta"> <LoadingState/> </AuthLayout>

    if(profile?.verified){
        return(
            <AuthLayout title="Conta verificada">
                <StatusMessage type="success">
                    Sua conta ja está vericada
                </StatusMessage>
            </AuthLayout>
        )
    }

    const onSubmit = (data: VerifyCodeFormData) => confirmAccount.mutate(data);

    return (
        <AuthLayout title="Verificar conta">

            {confirmAccount.isSuccess ? (

                <StatusMessage type="success">
                    <p role="status">Conta verificada com sucesso!</p>
                </StatusMessage>
                
            ):(
                <form onSubmit={handleSubmit(onSubmit)}>

                    <TextField
                        label="Código de verificação"
                        type="text"
                        {...register("code")}
                        error={errors.code?.message}
                    />
                    

                    {confirmAccount.isError && (
                        <StatusMessage type="error">
                            <ApiErrorDisplay
                                error={confirmAccount.error}
                                fallbackMessage="Não foi possível verificar seu e-mail"
                            />
                        </StatusMessage>
                    )}

                    <Button 
                        type="submit"
                        disabled={confirmAccount.isPending}
                        className={sharedStyle.submitButton}
                    >
                        {confirmAccount.isPending ? "Confirmando..." : "Confirmar"}
                    </Button>
                    
                </form>
            )}

            <div className={sharedStyle.center}>
                <Button
                    variant="ghost"
                    onClick={() => resendConfirmation.mutate()}
                    disabled={resendConfirmation.isPending}
                >
                    {resendConfirmation.isPending ? "Enviando..." : "Reenviar código"}
                </Button>
            </div>
            {resendConfirmation.isSuccess &&
                <StatusMessage type="success" >Código reenviado</StatusMessage>
            }
        </AuthLayout>
    )
}
