import { useMutation } from "@tanstack/react-query";
import { userService } from "../services/userService";
import type { EmailFormData } from "../types/emailSchema";

export function useRequestEmailChange(username: string){
    return useMutation({
        mutationFn: (data: EmailFormData) => userService.requestEmailChange(username, data),
    })
}