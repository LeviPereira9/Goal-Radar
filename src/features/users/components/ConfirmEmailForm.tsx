import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailConfirmSchema, type EmailConfirmFormData } from "../types/emailConfirmSchema";
import { useConfirmEmailChange } from "../hooks/useConfirmEmailChange";
import { ApiErrorDisplay } from "@/shared/components/ApiErrorDisplay";
import { TextField } from "@/shared/components/TextField/TextField";
import { StatusMessage } from "@/shared/components/StatusMessage/StatusMessage";
import { Button } from "@/shared/components/Button/Button";
import sharedStyles from "@/shared/styles/shared.module.css";

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
        <div>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', marginBottom: '16px' }}>Enviamos um código para o seu e-mail atual. Informe-o abaixo para concluir a troca.</p>
            <form onSubmit={handleSubmit(onSubmit)}>

                <TextField
                    label="Código"
                    type="text"
                    {...register("code")}
                    error={errors.code?.message}
                />
                
                {confirmEmailChange.isError && (
                    <StatusMessage type="error">
                        <ApiErrorDisplay
                        error={confirmEmailChange.error}
                        fallbackMessage="Código inválido."
                    />
                    </StatusMessage>
                )}
                <div className={sharedStyles.center}>
                    <Button
                        type="submit"
                        disabled={confirmEmailChange.isPending}
                    > {confirmEmailChange.isPending ? "Confirmando...": "Confirmar"} </Button>
                </div>
            </form>
        </div>
    )
    
}