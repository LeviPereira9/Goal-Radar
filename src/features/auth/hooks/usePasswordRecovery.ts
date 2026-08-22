import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/authService";
import type { ResetPasswordFormData } from "../types/resetPasswordSchema";

export function useForgotPassword(){
    return useMutation({
        mutationFn: (username: string) => authService.forgotPassword(username),
    })
}

export function useResetPassword(username: string){
    return useMutation({
        mutationFn: (data: ResetPasswordFormData) =>
            authService.resetPassword(username, data.code, {
                newPassword: data.newPassword,
                confirmNewPassword: data.confirmNewPassword,
            })
    })
}