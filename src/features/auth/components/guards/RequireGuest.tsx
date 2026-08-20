import {Navigate, Outlet} from "react-router-dom";
import { useMe } from "../../hooks/useMe";

export function RequireGuest(){
    const {data: user, isLoading} = useMe();

    if(isLoading){
        return <div>Carregando...</div>
    }

    if(user){
        return <Navigate to="/" replace />;
    }

    return <Outlet/>;
}