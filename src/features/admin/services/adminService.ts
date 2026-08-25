import { httpClient } from "@/shared/lib/http/client";
import type { Role } from "@/shared/types";
import type { RoleListResponse } from "../types/role";
import type { CodeListResponse, CompetitionCode } from "../types/code";

export const adminService = {
    getAllRoles: () => httpClient.get<RoleListResponse>("/api/v1/role"),

    modifyRole: (username: string, role: Role) =>
        httpClient.put<void>(`/api/v1/user/${username}/role?role=${encodeURIComponent(role)}`),

    getAllCodes: () => httpClient.get<CodeListResponse>("/api/v1/competition/code"),

    createCode: (code: string, name: string) =>
        httpClient.post<CompetitionCode>("/api/v1/competition/code", { code, name }),

    deactivateCode: (competitionId: number) =>
        httpClient.delete<void>(`/api/v1/competition/code/${competitionId}`),

    startAllSyncs: () => httpClient.post<void>("/api/v1/auto"),

    startSync: (codeId: number) => httpClient.post<void>(`/api/v1/auto/${codeId}`),

    reactivateCode: (competitionId: number) =>
        httpClient.put<CompetitionCode>(`/api/v1/competition/code/${competitionId}`),
}
