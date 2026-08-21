import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "../services/userService";
import type { PasswordFormData } from "../types/passwordSchema";
import { AUTH_ME_QUERY_KEY } from "@/features/auth/hooks/useMe";

export function useUpdatePassword(username: string){
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (data: PasswordFormData) => userService.updatePassword(username, data),
        onSuccess: () => queryClient.setQueryData(AUTH_ME_QUERY_KEY, null),
    });
}