import { useState } from "react";
import { useParams } from "react-router-dom";
import { useUserDetails } from "../hooks/useUserProfile";
import { EmailNotVerified } from "../components/EmailNotVerified";
import { RequestEmailForm } from "../components/RequestEmailForm";
import { ConfirmEmailForm } from "../components/ConfirmEmailForm";
import { EmailChangeDone } from "../components/EmailChangeDone";
import { UserActionLayout } from "../components/UserActionLayout/UserActionLayout";

type Step = "request" | "confirm" | "done";

export function ChangeEmailPage(){
    const {username} = useParams<{username: string}>();
    const [step, setStep] = useState<Step>("request");

    const detailsQuery = useUserDetails(username!);
    
    if(detailsQuery.isLoading){
        return <UserActionLayout title="Alterar e-mail">Carregando...</UserActionLayout>
    }
    
    if(detailsQuery.isError || !detailsQuery.data){
        return <UserActionLayout title="Alterar e-mail">Não foi possível carregar seus dados.</UserActionLayout>
    }

    if(!detailsQuery.data.verified){
        return (
            <UserActionLayout title="Alterar e-mail" >
                <EmailNotVerified username={username!}/>
            </UserActionLayout>
        );
    }

    return (
        <UserActionLayout title="Alterar e-mail">
            {step === 'confirm' && <ConfirmEmailForm username={username!} onConfirmed={() => setStep('done')} />}
            {step === 'done' && <EmailChangeDone />}
            {step === 'request' && <RequestEmailForm username={username!} onRequested={() => setStep('confirm')} />}
        </UserActionLayout>
    )
}