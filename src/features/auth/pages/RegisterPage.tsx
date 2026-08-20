import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { type RegisterFormData, registerSchema } from "../types/registerSchema";
import { useRegister } from "../hooks/useRegister";
import { ApiError } from "@/shared/lib/http/errors";

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
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Criar conta</h1>
            
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

            <div>
                <label htmlFor="email">E-mail</label>
                <input
                    type="email"
                    id="email"
                    {...register("email")}
                />
                {errors.email &&
                    <span>{errors.email.message}</span>
                }
            </div>

            <div>
                <label htmlFor="dateOfBirth">Data de nascimento</label>
                <input
                    type="date"
                    id="dateOfBirth"
                    {...register("dateOfBirth")}
                />
                {errors.dateOfBirth && 
                    <span>{errors.dateOfBirth.message}</span>
                }
            </div>

            <div>
                <label htmlFor="password">Senha</label>
                <input 
                    type="password"
                    id="password"
                />
                {errors.password &&
                    <span>{errors.password.message}</span>
                }
            </div>

            <div>
                <label htmlFor="confirmPassword">Confirmar senha</label>
                <input
                    type="password" id="confirmPassword"
                />
                {errors.confirmPassword &&
                    <span>{errors.confirmPassword.message}</span>
                }
            </div>

            {registerMutation.isError && (
                <p role="alert">
                    {registerMutation.error instanceof ApiError ?
                    registerMutation.error.message :
                    "Não foi possível criar sua conta. Tente novamente."
                    }
                </p>
            )}

            {registerMutation.error instanceof ApiError && registerMutation.error.fieldErrors && (
                <ul role="alert" >
                    {Object.entries(registerMutation.error.fieldErrors).map(([field, message]) => (
                        <li key={field}>{message}</li>
                    ))}
                </ul>
            ) }

            <button 
                type="submit"
                disabled={registerMutation.isPending}
            > {registerMutation.isPending ? "Criando conta..." : "Criar conta"} </button>
        </form>
    )
}