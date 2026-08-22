import {useMutation, useQueryClient} from "@tanstack/react-query";
import { userService } from "../services/userService";
import type { EmailConfirmFormData } from "../types/emailConfirmSchema";

export function useConfirmEmailChange(username: string){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: EmailConfirmFormData) => userService.confirmEmailChange(username, data.code),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["users", "details", username]});
        },
    });
}
