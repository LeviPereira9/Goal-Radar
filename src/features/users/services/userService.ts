import { httpClient } from "@/shared/lib/http/client";
import type { UserShortProfile, UserProfile } from "../types/user";
import type { PasswordFormData } from "../types/passwordSchema";
import type { EmailFormData } from "../types/emailSchema";
import type { Page } from "@/shared/types";

export const userService = {
    getShort: (username: string) =>
        httpClient.get<UserShortProfile>(`/api/v1/user/${username}`),
    
    getDetails: (username: string) =>
        httpClient.get<UserProfile>(`/api/v1/user/${username}/details`),

    updatePassword: (username: string, data: PasswordFormData) =>
        httpClient.patch<void>(`/api/v1/user/${username}/password`, data),

    requestEmailChange: (username: string, data: EmailFormData) =>
        httpClient.post<void>(`/api/v1/user/${username}/email`, data),

    deleteAccount: (username: string) =>
        httpClient.delete<void>(`/api/v1/user/${username}`),

    confirmEmailChange: (username: string, code: string) =>
        httpClient.post<void>(`/api/v1/verify/email/${username}?token=${encodeURIComponent(code)}`),

    search: (search: string, page: number) =>
        httpClient.get<Page<UserShortProfile>>(
            `/api/v1/user/search?search=${encodeURIComponent(search)}&page=${page}`
        )
}