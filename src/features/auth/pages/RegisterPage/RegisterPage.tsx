import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { type RegisterFormData, registerSchema } from "../../types/registerSchema";
import { useRegister } from "../../hooks/useRegister";
import { ApiErrorDisplay } from "@/shared/components/ApiErrorDisplay";
import { AuthLayout } from "../../components/AuthLayout";
import { TextField } from "@/shared/components/TextField/TextField";
import { StatusMessage } from "@/shared/components/StatusMessage/StatusMessage";
import { Button } from "@/shared/components/Button/Button";
import styles from "./RegisterPage.module.css";
import sharedStyles from "@/shared/styles/shared.module.css";

export function RegisterPage(){
    const navigate = useNavigate();
    const registerMutation = useRegister();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = (data: RegisterFormData) => {
        registerMutation.mutate(data, {
            onSuccess: () => {
                navigate("/", {replace: true});
            }
        })
    }

    return (
        <AuthLayout title="Criar conta">
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="Usuário"
                    type="text"
                    {...register("username")}
                    error={errors.username?.message}
                />

                <TextField
                    label="E-mail"
                    type="email"
                    {...register("email")}
                    error={errors.email?.message}
                />

                <TextField
                    label="Data de nascimento"
                    type="date"
                    {...register("dateOfBirth")}
                    error={errors.dateOfBirth?.message}
                />

                <TextField
                    label="Senha"
                    type="password"
                    {...register("password")}
                    error={errors.password?.message}
                />

                <TextField
                    label="Confirmar senha"
                    type="password"
                    {...register("confirmPassword")}
                    error={errors.confirmPassword?.message}
                />


                {registerMutation.isError && (
                    <StatusMessage type="error">
                        <ApiErrorDisplay
                            error={registerMutation.error} 
                            fallbackMessage="Não foi possível criar uma conta. Tente novamente."/>
                    </StatusMessage>
                )}

                <Button 
                    type="submit"
                    disabled={registerMutation.isPending}
                    className={sharedStyles.submitButton}
                > {registerMutation.isPending ? "Criando conta..." : "Criar conta"} </Button>
            </form>

            <div className={styles.links} >
                <Link to="/login">Já possui uma conta?</Link>
            </div>
        </AuthLayout>
    )
}