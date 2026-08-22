import { httpClient } from "@/shared/lib/http/client";
import type { AuthUser } from "../types/user";
import type { LoginRequest, RegisterRequest } from "../types/requests";

export const authService = {
    me: () => httpClient.get<AuthUser>("/api/v1/auth/me"),
    
    login: (data: LoginRequest) =>
        httpClient.post<void>("/api/v1/auth/login", data),

    logout: () => httpClient.post<void>("/api/v1/auth/logout"),

    register: (data: RegisterRequest) => httpClient.post<void>("/api/v1/auth/register", data),

    
    resendConfirmationEmail: (username: string) => 
        httpClient.post<void>(`/api/v1/verify/resend/${username}`),

    confirmAccount: (username: string, code: string) =>
        httpClient.post<void>(`/api/v1/verify/confirm/${username}?token=${encodeURIComponent(code)}`),

    forgotPassword: (username: string) =>
        httpClient.post<void>(`/api/v1/verify/password/forgot/${username}`),

    resetPassword: (username: string, code: string, data: {newPassword: string, confirmNewPassword: string}) =>
        httpClient.post<void>(`/api/v1/verify/password/reset/${username}?token=${encodeURIComponent(code)}`, data),
};

