import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "../types/forgotPasswordSchema";
import { useForgotPassword } from "../hooks/usePasswordRecovery";
import { ApiErrorDisplay } from "@/shared/components/ApiErrorDisplay";
import { AuthLayout } from "../components/AuthLayout";
import { StatusMessage } from "@/shared/components/StatusMessage/StatusMessage";
import { TextField } from "@/shared/components/TextField/TextField";
import { Button } from "@/shared/components/Button/Button";
import sharedStyle from "@/shared/styles/shared.module.css";

export function ForgotPasswordPage(){
    const navigate = useNavigate();
    const forgotPassword = useForgotPassword();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema)
    });

    const onSubmit = (data: ForgotPasswordFormData) => {
        forgotPassword.mutate(data.username, {
            onSuccess: () => {
                navigate(`/reset-password/${data.username}`);
            }
        })
    }

    return (
        <AuthLayout title="Esqueci minha senha">
            <form onSubmit={handleSubmit(onSubmit)} >
                <StatusMessage type="info">
                    <p>Informe seu usuário para receber um código de redefinição.</p>
                </StatusMessage>

                <TextField
                    label="Usuário"
                    type="text"
                    {...register("username")}
                    error={errors.username?.message}
                />



                {forgotPassword.isError && (
                    <StatusMessage type="error">
                        <ApiErrorDisplay
                        error={forgotPassword.error}
                        fallbackMessage="Não foi possível solicitar a redefinição de senha"
                    />
                    </StatusMessage>
                )}

                <Button
                    type="submit"
                    isLoading={forgotPassword.isPending}
                    className={sharedStyle.submitButton}
                >
                    {forgotPassword.isPending ? "Enviando..." : "Enviar código"}
                </Button>

            </form>
        </AuthLayout>
    );
}
