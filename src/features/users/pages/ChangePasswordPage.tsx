import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useNavigate } from "react-router-dom";
import { passwordSchema, type PasswordFormData } from "../types/passwordSchema"; 
import { useUpdatePassword } from "../hooks/useUpdatePassword";
import { ApiErrorDisplay } from "@/shared/components/ApiErrorDisplay";
import { UserActionLayout } from "../components/UserActionLayout/UserActionLayout";
import { TextField } from "@/shared/components/TextField/TextField";
import { StatusMessage } from "@/shared/components/StatusMessage/StatusMessage";
import { Button } from "@/shared/components/Button/Button";

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
        <UserActionLayout title="Alterar senha">
            
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label="Senha atual"
                        type="password"
                        {...register("currentPassword")}
                        error={errors.currentPassword?.message}
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
            
                    {updatePassword.isError && (
                        <StatusMessage type="error" >
                            <ApiErrorDisplay error={updatePassword.error} fallbackMessage="Não foi possível alterar sua senha" />
                        </StatusMessage>
                    )}
            
                    <Button
                        type="submit"
                        disabled={updatePassword.isPending}>
                        {updatePassword.isPending ? "Salvando..." : "Alterar senha"}
                    </Button>
            
                </form>
        </UserActionLayout>
    )
}