import { httpClient } from "@/shared/lib/http/client";
import type { Role } from "@/shared/types";
import type { RoleListResponse } from "../types/role";

export const adminService = {
    getAllRoles: () => httpClient.get<RoleListResponse>("/api/v1/role"),

    modifyRole: (username: string, role: Role) =>
        httpClient.put<void>(`/api/v1/user/${username}/role?role=${encodeURIComponent(role)}`)
}
