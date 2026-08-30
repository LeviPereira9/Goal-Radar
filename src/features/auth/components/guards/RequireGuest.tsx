import {Navigate, Outlet} from "react-router-dom";
import { useMe } from "../../hooks/useMe";
import { LoadingState } from "@/shared/components/LoadingState/LoadingState";

export function RequireGuest(){
    const {data: user, isLoading} = useMe();

    if(isLoading){
        return <LoadingState/>
    }

    if(user){
        return <Navigate to="/" replace />;
    }

    return <Outlet/>;
}