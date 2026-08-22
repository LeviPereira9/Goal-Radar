import { useQuery } from "@tanstack/react-query";
import { userService } from "../services/userService";

export function useUserShortProfile(username: string){
    return useQuery({
        queryKey: ["users", "short", username],
        queryFn: () => userService.getShort(username),
        enabled: !!username,
    })
}

export function useUserDetails(username: string){
    return useQuery({
        queryKey: ["users", "details", username],
        queryFn: () => userService.getDetails(username),
        enabled: !!username,
        retry: false
    })
}