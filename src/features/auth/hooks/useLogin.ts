import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/authService";
import { AUTH_ME_QUERY_KEY } from "./useMe";
import type { LoginFormData } from "../types/loginSchema";

export function useLogin(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: LoginFormData) => authService.login(data.login, data.password),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: AUTH_ME_QUERY_KEY})
        }
    })
}