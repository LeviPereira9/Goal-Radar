import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/authService";
import { AUTH_ME_QUERY_KEY } from "./useMe";

export function useLogout(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: authService.logout,
        onSuccess: () => {
            queryClient.setQueryData(AUTH_ME_QUERY_KEY, null);

        },
    });
}