import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useMe } from "../../hooks/useMe";
import { LoadingState } from "@/shared/components/LoadingState/LoadingState";

export function RequireAuth(){
    const {data: user, isLoading, isError} = useMe();
    const location = useLocation();

    if(isLoading){
        return <LoadingState/>
    }

    if(isError || !user){
        return <Navigate
        to="/login"
        state={{from:location}}
        replace />
    }

    return <Outlet/>;
}