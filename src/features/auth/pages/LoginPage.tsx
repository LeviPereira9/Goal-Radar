import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { loginSchema, type LoginFormData } from "../types/loginSchema";
import { useLogin } from "../hooks/useLogin";
import { ApiErrorDisplay } from "@/shared/components/ApiErrorDisplay";

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
        <>
        {successMessage &&
            <p role="status" >{successMessage}</p>
        }
        
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Entrar</h1>

        <div>
            <label htmlFor="login">Usuário ou e-mail</label>
            <input
                id="login"
                type="text"
                {...register("login")}
            />
            {errors.login &&
                <span>{errors.login.message}</span>
            }
        </div>

        <div>
            <label htmlFor="password">Senha</label>
            <input 
                type="password"
                id="password"
                {...register("password")}
                />
            {errors.password &&
                <span>{errors.password.message}</span>
            }
        </div>
            
            {login.isError && (
                <ApiErrorDisplay error={login.error} fallbackMessage="Não foi possível entrar na conta. Tente novamente." />
            )}
            
            <button type="submit" disabled={login.isPending}>
                {login.isPending ? "Entrando..." : "Entrar"}
            </button>
            <Link to="/forgot-password">Esqueci minha senha</Link>
            
        </form>
        </>
        
    )


}