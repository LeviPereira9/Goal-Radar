import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "../services/adminService";
import type { Role } from "@/shared/types";

export function useModifyRole(username: string){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (role: Role) => adminService.modifyRole(username, role),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["users", "short", username]});
            queryClient.invalidateQueries({queryKey: ["users", "details", username]});
        }
    })
}