import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "../services/userService";
import { AUTH_ME_QUERY_KEY } from "@/features/auth/hooks/useMe";

interface DeleteAccountVariables {
    isSelf: boolean;
}

export function useDeleteAccount(username: string){
    const queryClient = useQueryClient();

    return useMutation({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        mutationFn: (_variables: DeleteAccountVariables) => userService.deleteAccount(username),
        onSuccess: (_data, variables) => {
            if (variables.isSelf){
                queryClient.setQueryData(AUTH_ME_QUERY_KEY, null);
            }
        }
    })
}