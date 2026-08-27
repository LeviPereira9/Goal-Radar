import {useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { emailSchema, type EmailFormData } from "../types/emailSchema";
import { useRequestEmailChange } from "../hooks/useRequestEmailChange";
import { ApiErrorDisplay } from "@/shared/components/ApiErrorDisplay";
import { UserActionLayout } from "./UserActionLayout/UserActionLayout";
import { TextField } from "@/shared/components/TextField/TextField";
import { StatusMessage } from "@/shared/components/StatusMessage/StatusMessage";
import { Button } from "@/shared/components/Button/Button";
import sharedStyles from "@/shared/styles/shared.module.css";

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
        <UserActionLayout title="Alterar e-mail">
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="Novo e-mail"
                    type="email"
                    {...register("newEmail")}
                    error={errors.newEmail?.message}
                />
                
                {requestEmailChange.isError && (
                    <StatusMessage type="error">
                        <ApiErrorDisplay
                            error=     {requestEmailChange.error}
                        fallbackMessage="Não foi possível solicitar a alteração de e-mail"
                    />
                    </StatusMessage>
                )}
                <div className={sharedStyles.center} >
                    <Button type="submit" disabled={requestEmailChange.isPending}>
                        {requestEmailChange.isPending ? "Enviando..." : "Enviar código"}
                    </Button>
                </div>
            </form>
        </UserActionLayout>
    )
}