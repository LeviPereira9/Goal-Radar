import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "../types/forgotPasswordSchema";
import { useForgotPassword } from "../hooks/usePasswordRecovery";
import { ApiErrorDisplay } from "@/shared/components/ApiErrorDisplay";

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
        <form onSubmit={handleSubmit(onSubmit)} >

            <h1>Esqueci minha senha</h1>
            <p>Informe seu usuário para receber um código de redefinição.</p>

            <div>
                <label htmlFor="username">Usuário</label>
                <input 
                    type="text"
                    id="username"
                    {...register("username")}
                />
                {errors.username &&
                    <span>{errors.username.message}</span>
                }
            </div>

            {forgotPassword.isError && (
                <ApiErrorDisplay
                    error={forgotPassword.error}
                    fallbackMessage="Não foi possível solicitar a redefinição de senha"
                />
            )}

            <button
                type="submit"
                disabled={forgotPassword.isPending}
            >
                {forgotPassword.isPending ? "Enviando..." : "Enviar código"}
            </button>

        </form>
    );
}
