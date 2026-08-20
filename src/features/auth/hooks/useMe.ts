import { useQuery } from "@tanstack/react-query";
import { authService } from "../services/authService";
import type { AuthUser } from "../types/user";

export const AUTH_ME_QUERY_KEY = ["auth", "me"] as const;

export function useMe(){
    return useQuery<AuthUser | null>({
        queryKey: AUTH_ME_QUERY_KEY,
        queryFn: authService.me,
        retry: false,
        staleTime: 5 * 60 * 1000
    })
}