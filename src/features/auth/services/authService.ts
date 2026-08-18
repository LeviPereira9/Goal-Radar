import { httpClient } from "@/shared/lib/http/client";
import type { AuthUser } from "../types/user";

export const authService = {
    me: () => httpClient.get<AuthUser>("/api/v1/me"),
    
    login: (login: string , password: string) =>
        httpClient.post<void>("/api/v1/auth/login", {login, password}),

    logout: () => httpClient.post<void>("/api/v1/auth/logout"),
};

