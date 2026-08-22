import { useMutation } from "@tanstack/react-query";
import { userService } from "../services/userService";

export function useResendVerificationEmail(username: string){
    return useMutation({
        mutationFn: () => userService.resendConfirmationEmail(username),
    });
}