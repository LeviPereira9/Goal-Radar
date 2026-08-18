import { Navigate, Outlet, useParams } from "react-router-dom";
import { useMe } from "../../hooks/useMe";
import { isSelfOrElevated } from "@/shared/lib/rbac";

export function RequireSelfOrElevated(){
    const { username } = useParams<{username: string}>();
    const { data: user } = useMe();


    if (!user || !username || !isSelfOrElevated(user.username, username, user.role)){
        return <Navigate to="/forbidden" replace/>;
    }
    
    return <Outlet />;
}