import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailConfirmSchema, type EmailConfirmFormData } from "../types/emailConfirmSchema";
import { useConfirmEmailChange } from "../hooks/useConfirmEmailChange";
import { ApiErrorDisplay } from "@/shared/components/ApiErrorDisplay";

interface ConfirmEmailFormProps {
    username: string;
    onConfirmed: () => void;
}

export function ConfirmEmailForm({username, onConfirmed} : ConfirmEmailFormProps){

    const confirmEmailChange = useConfirmEmailChange(username);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EmailConfirmFormData>({resolver: zodResolver(emailConfirmSchema)});

    const onSubmit = (data: EmailConfirmFormData) => {
        confirmEmailChange.mutate(data, {onSuccess: onConfirmed});
    };

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Confirme a alteração</h1>
            <p>Enviamos um código para o seu e-mail atual. Informe-o abaixo para concluir a troca.</p>

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

            {confirmEmailChange.isError && (
                <ApiErrorDisplay
                    error={confirmEmailChange.error}
                    fallbackMessage="Código inválido."
                />
            )}

            <button
                type="submit"
                disabled={confirmEmailChange.isPending}
            > {confirmEmailChange.isPending ? "Confirmando...": "Confirmar"} </button>
        </form>
    )
    
}