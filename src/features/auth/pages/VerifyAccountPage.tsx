import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyCodeSchema, type VerifyCodeFormData } from "../types/verifyCodeSchema";
import { useConfirmAccount, useResendConformation } from "../hooks/useAccountVerification";
import { useMyDetails } from "../hooks/useMyDetails";
import { ApiErrorDisplay } from "@/shared/components/ApiErrorDisplay";

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

    if(isLoading) return <div>Carregando...</div>

    if(profile?.verified){
        return(
            <div>
                <h1>Conta verificada</h1>
                <p>Sua conta já está verificada</p>
            </div>
        )
    }

    const onSubmit = (data: VerifyCodeFormData) => confirmAccount.mutate(data);

    return (
        <div>
            <h1>Verificar conta</h1>

            {confirmAccount.isSuccess ? (
                <p role="status">Conta verificada com sucesso!</p>
            ):(
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div>
                        <label htmlFor="code">Código de verificação</label>
                        <input
                            type="text"
                            id="code"
                            {...register("code")}
                        />
                        {errors.code &&
                            <span>{errors.code.message}</span>
                        }
                    </div>

                    {confirmAccount.isError && (
                        <ApiErrorDisplay
                            error={confirmAccount.error}
                            fallbackMessage="Não foi possível verificar seu e-mail"
                        />
                    )}

                    <button 
                        type="submit"
                        disabled={confirmAccount.isPending}
                    >
                        {confirmAccount.isPending ? "Confirmando..." : "Confirmar"}
                    </button>
                    
                </form>
            )}

            <button 
                onClick={() => resendConfirmation.mutate()}
                disabled={resendConfirmation.isPending}
            >
                {resendConfirmation.isPending ? "Enviando..." : "Reenviar código"}
            </button>
            {resendConfirmation.isSuccess &&
                <p role="status" >Código reenviado</p>
            }
        </div>
    )
}
