import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useNavigate } from "react-router-dom";
import { passwordSchema, type PasswordFormData } from "../types/passwordSchema"; 
import { useUpdatePassword } from "../hooks/useUpdatePassword";
import { ApiErrorDisplay } from "@/shared/components/ApiErrorDisplay";

export function ChangePasswordPage(){
    const { username } = useParams<{username: string}>();
    const navigate = useNavigate();
    const updatePassword = useUpdatePassword(username!);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PasswordFormData>({
        resolver: zodResolver(passwordSchema),
    });

    const onSubmit = (data: PasswordFormData) => {
        updatePassword.mutate(data, {
            onSuccess: () => {
                navigate("/login", {
                    replace: true,
                    state: {message: "Senha alterada com sucesso. Faça login novamente."}
                });
            },
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Alterar senha</h1>

            <div>
                <label htmlFor="currentPassword">Senha atual</label>
                <input
                    type="password" id="currentPassword"
                    {...register("currentPassword")}
                />
                {errors.currentPassword && 
                    <span>{errors.currentPassword.message}</span>
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
            
            {updatePassword.isError && (
                <ApiErrorDisplay error={updatePassword.error} fallbackMessage="Não foi possível alterar sua senha" />
            )}
            
            <button type="submit" disabled={updatePassword.isPending}>
                {updatePassword.isPending ? "Salvando..." : "Alterar senhaa"}
            </button>
            
        </form>
    )
}