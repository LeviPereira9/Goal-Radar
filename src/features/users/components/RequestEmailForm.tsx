import {useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { emailSchema, type EmailFormData } from "../types/emailSchema";
import { useRequestEmailChange } from "../hooks/useRequestEmailChange";
import { ApiErrorDisplay } from "@/shared/components/ApiErrorDisplay";

interface RequestEmailFormProps{
    username: string;
    onRequested: () => void;
}

export function RequestEmailForm({username, onRequested}: RequestEmailFormProps){

    const requestEmailChange = useRequestEmailChange(username);
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EmailFormData>({resolver:zodResolver(emailSchema)});
    
    const onSubmit = (data: EmailFormData) => {
        requestEmailChange.mutate(data, {onSuccess: onRequested});
    }
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Alterar e-mail</h1>

            <div>
                <label htmlFor="newEmail">Novo e-mail</label>
                <input
                    type="email"
                    id="newEmail"
                    {...register("newEmail")}
                />
                {errors.newEmail &&
                    <span>{errors.newEmail.message}</span>
                }
            </div>

            {requestEmailChange.isError && (
                <ApiErrorDisplay error={requestEmailChange.error}
                fallbackMessage="Não foi possível solicitar a alteração de e-mail"
                />
            )}

            <button type="submit" disabled={requestEmailChange.isPending}>
                {requestEmailChange.isPending ? "Enviando..." : "Enviar código de confirmação"}
            </button>
        </form>
    )
}