import { Navigate, Outlet } from "react-router-dom";
import { useMe } from "../../hooks/useMe";
import { hasMinimumRole } from "@/shared/lib/rbac";
import type { Role } from "@/shared/types";

interface RequireRoleProps {
    minRole: Role;
}

export function RequireRole({minRole}: RequireRoleProps){
    const { data: user } = useMe();

    if(!user || !hasMinimumRole(user.role, minRole)){
        return <Navigate to="/forbidden" replace/>;
    }
    
    return <Outlet />;
}
