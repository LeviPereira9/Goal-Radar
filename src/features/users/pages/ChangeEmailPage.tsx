import { useState } from "react";
import { useParams } from "react-router-dom";
import { useUserDetails } from "../hooks/useUserProfile";
import { EmailNotVerified } from "../components/EmailNotVerified";
import { RequestEmailForm } from "../components/RequestEmailForm";
import { ConfirmEmailForm } from "../components/ConfirmEmailForm";
import { EmailChangeDone } from "../components/EmailChangeDone";

type Step = "request" | "confirm" | "done";

export function ChangeEmailPage(){
    const {username} = useParams<{username: string}>();
    const [step, setStep] = useState<Step>("request");

    const detailsQuery = useUserDetails(username!);
    
    if(detailsQuery.isLoading){
        return <div>Carregando...</div>
    }
    
    if(detailsQuery.isError || !detailsQuery.data){
        return <div>Não foi possível carregar seus dados.</div>
    }

    if(!detailsQuery.data.verified){
        return <EmailNotVerified username={username!}/>;
    }

    switch (step) {
        case "confirm":
            return <ConfirmEmailForm username={username!} onConfirmed={()=> setStep("done")}/>
        case "done":
            return <EmailChangeDone/>
        default:
            return <RequestEmailForm username={username!} onRequested={()=> setStep("confirm")} />
    }
}