import { Navigate, Outlet, useParams } from "react-router-dom";
import { useMe } from "../../hooks/useMe";
import { isSelfOnly } from "@/shared/lib/rbac";

export function RequireSelfOnly(){
    const { username } = useParams<{username: string}>();
    const { data: user } = useMe();


    if (!user || !username || !isSelfOnly(user.username, username)){
        return <Navigate to="/forbidden" replace/>;
    }
    
    return <Outlet />;
}