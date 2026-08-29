import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { loginSchema, type LoginFormData } from "../../types/loginSchema";
import { useLogin } from "../../hooks/useLogin";
import { Button } from "@/shared/components/Button/Button";
import { TextField } from "@/shared/components/TextField/TextField";
import { StatusMessage } from "@/shared/components/StatusMessage/StatusMessage";
import styles from "./LoginPage.module.css"
import { AuthLayout } from "../../components/AuthLayout";
import { ApiErrorDisplay } from "@/shared/components/ApiErrorDisplay";
import sharedStyles from "@/shared/styles/shared.module.css";

export function LoginPage(){
    const navigate = useNavigate();
    const location = useLocation();
    const login = useLogin();

    const successMessage = (location.state as {message?: string})?.message;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data: LoginFormData) => {
        login.mutate(data, {
            onSuccess: () => {
                const from = (location.state as {from?: Location})?.from;
                navigate(from?.pathname ?? "/", {replace: true});
            },
        });
    };

    return (
        <AuthLayout title="Entrar" >
        

        {successMessage &&
            <StatusMessage type="success">
                <p>{successMessage}</p>
            </StatusMessage>
        }
        
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                label="Usuário ou e-mail"
                type="text"
                {...register("login")}
                error={errors.login?.message}
            />
            <TextField
                label="Senha"
                type="password"
                {...register("password")}
                error={errors.password?.message}
            />
            
                
            {login.isError && (
                <StatusMessage type="error">
                    <ApiErrorDisplay
                        error={login.error}
                        fallbackMessage="Não foi possível entrar"
                    />
                </StatusMessage>
            )}
                
            <Button
                type="submit"
                isLoading={login.isPending}
                className={sharedStyles.submitButton}
                >
                {login.isPending ? "Entrando..." : "Entrar"}
            </Button>
        </form>

        <div className={styles.links}>
            <Link to="/forgot-password">Esqueci minha senha</Link>
            <Link to="/register">Criar uma conta</Link>
        </div>
    </AuthLayout>
        
    )


}