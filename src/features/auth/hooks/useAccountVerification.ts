import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/authService";
import type { VerifyCodeFormData } from "../types/verifyCodeSchema";

export function useResendConformation(username: string){
    return useMutation({
        mutationFn: () => authService.resendConfirmationEmail(username),
    });
}

export function useConfirmAccount(username: string){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: VerifyCodeFormData) => authService.confirmAccount(username, data.code),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["users", "details", username]})
        }
    })
}