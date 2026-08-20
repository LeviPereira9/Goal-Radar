import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/authService";
import { AUTH_ME_QUERY_KEY } from "./useMe";
import type { RegisterFormData } from "../types/registerSchema";

export function useRegister(){
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (data: RegisterFormData) => authService.register(data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: AUTH_ME_QUERY_KEY});
        }
    })
}