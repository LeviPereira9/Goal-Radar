import { ROLE_HIERARCHY, type Role } from "@/shared/types";

export function hasMinimumRole(userRole: Role, requiredRole: Role): boolean {
    return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}

export function hasElevatedPrivileges(userRole: Role): boolean {
    return ROLE_HIERARCHY[userRole] > ROLE_HIERARCHY.USER
}

export function isSelf(currentUsername: string, targetUsername:string):boolean{
    return currentUsername === targetUsername;
}

export function isSelfOnly(currentUsername: string, targetUsername:string):boolean{
    return isSelf(currentUsername, targetUsername);
}

export function isSelfOrElevated(
    currentUsername: string,
    targetUsername: string,
    userRole: Role
): boolean{
    return isSelf(currentUsername, targetUsername) || hasElevatedPrivileges(userRole);
}

export function canModifyRole(currentUserRole: Role, targetRole: Role): boolean{
    return ROLE_HIERARCHY[currentUserRole] > ROLE_HIERARCHY[targetRole];
}

