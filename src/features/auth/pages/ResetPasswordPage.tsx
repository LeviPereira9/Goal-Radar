import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useNavigate } from "react-router-dom";
import { resetPasswordSchema, type ResetPasswordFormData } from "../types/resetPasswordSchema";
import { useResetPassword } from "../hooks/usePasswordRecovery";
import { ApiErrorDisplay } from "@/shared/components/ApiErrorDisplay";
import { AuthLayout } from "../components/AuthLayout";
import { StatusMessage } from "@/shared/components/StatusMessage/StatusMessage";
import { TextField } from "@/shared/components/TextField/TextField";
import { Button } from "@/shared/components/Button/Button";
import sharedStyle from "@/shared/styles/shared.module.css";

export function ResetPasswordPage(){
    const {username} = useParams<{username: string}>();
    const navigate = useNavigate();
    const resetPassword = useResetPassword(username!);

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema)
    });

    const onSubmit = (data: ResetPasswordFormData) => {
        resetPassword.mutate(data, {
            onSuccess: () => {
                navigate("/login", {
                    replace: true,
                    state: {
                        message: "Senha redefinida com sucesso. Faça login com sua nova senha. "
                    },
                })
            }
        })
    }

    return (
        <AuthLayout title="Redefinir a senha" >
            <form onSubmit={handleSubmit(onSubmit)}>
                <StatusMessage type="info">
                    <p>Informe o código recebido por e-mail e sua nova senha.</p>
                </StatusMessage>

                <TextField
                    label="Código"
                    type="text"
                    {...register}
                    error={errors.code?.message}
                />

                <TextField
                    label="Nova senha"
                    type="password"
                    {...register("newPassword")}
                    error={errors.newPassword?.message}
                />
                
                <TextField
                    label="Confirmar nova senha"
                    type="password"
                    {...register("confirmNewPassword")}
                    error={errors.confirmNewPassword?.message}
                />

                {resetPassword.isError && (

                    <StatusMessage type="error">
                        <ApiErrorDisplay
                            error={resetPassword.error}
                            fallbackMessage="Não foi possível redefinir sua senha"
                        />
                    </StatusMessage>
                    
                )}
                
                <Button
                    type="submit"
                    disabled={resetPassword.isPending}
                    className={sharedStyle.submitButton}
                >
                    {resetPassword.isPending ? "Redefinindo..." : "Redefinir senha"}
                </Button>
                
            </form>
        </AuthLayout>
    )
}