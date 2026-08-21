import { httpClient } from "@/shared/lib/http/client";
import type { UserShortProfile, UserProfile } from "../types/user";
import type { PasswordFormData } from "../types/passwordSchema";

export const userService = {
    getShort: (username: string) =>
        httpClient.get<UserShortProfile>(`/api/v1/user/${username}`),
    
    getDetails: (username: string) =>
        httpClient.get<UserProfile>(`/api/v1/user/${username}/details`),

    updatePassword: (username: string, data: PasswordFormData) =>
        httpClient.patch<void>(`/api/v1/user/${username}/password`, data),
}