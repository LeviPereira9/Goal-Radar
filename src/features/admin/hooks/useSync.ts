import { useMutation } from "@tanstack/react-query";
import { adminService } from "../services/adminService";

export function useStartAllSyncs(){
    return useMutation({
        mutationFn: adminService.startAllSyncs,
    });
}

export function useStartSync(){
    return useMutation({
        mutationFn: (codeId: number) => adminService.startSync(codeId),
    })
}