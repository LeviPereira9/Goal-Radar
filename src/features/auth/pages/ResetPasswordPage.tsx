import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useNavigate } from "react-router-dom";
import { resetPasswordSchema, type ResetPasswordFormData } from "../types/resetPasswordSchema";
import { useResetPassword } from "../hooks/usePasswordRecovery";
import { ApiErrorDisplay } from "@/shared/components/ApiErrorDisplay";

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
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Redefinir senha</h1>
            <p>Informe o código recebido por e-mail e sua nova senha.</p>

            <div>
                <label htmlFor="code">Código</label>
                <input
                    type="text"
                    id="code"
                    {...register("code")}
                />
                {errors.code &&
                    <span>{errors.code.message}</span>
                }
            </div>
            
            <div>
                <label htmlFor="newPassword">Nova senha</label>
                <input
                    type="password"
                    id="newPassword"
                    {...register("newPassword")}
                />
                {errors.newPassword &&
                    <span>{errors.newPassword.message}</span>
                }
            </div>

            <div>
                <label htmlFor="confirmNewPassword">Confirmar nova senha</label>
                <input
                    type="password"
                    id="confirmNewPassword"
                    {...register("confirmNewPassword")}
                />
                {errors.confirmNewPassword &&
                    <span>{errors.confirmNewPassword.message}</span>
                }
            </div>

            {resetPassword.isError && (
                <ApiErrorDisplay
                    error={resetPassword.error}
                    fallbackMessage="Não foi possível redefinir sua senha"
                />
            )}
            
            <button
                type="submit"
                disabled={resetPassword.isPending}
            >
                {resetPassword.isPending ? "Redefinindo..." : "Redefinir senha"}
            </button>
            
        </form>
    )
}