import { useQuery } from "@tanstack/react-query";
import { adminService } from "../services/adminService";

export function useRoles(){
    return useQuery({
        queryKey: ["admin", "roles"],
        queryFn: adminService.getAllRoles,
        staleTime: Infinity
    })
}