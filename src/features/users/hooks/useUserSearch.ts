import { useQuery } from "@tanstack/react-query";
import { keepPreviousData } from "@tanstack/react-query";
import { userService } from "../services/userService";

export function useUserSearch(search: string, page: number){
    return useQuery({
        queryKey: ["users", "search", search, page],
        queryFn: () => userService.search(search, page),
        enabled: search.trim().length > 0,
        placeholderData: keepPreviousData,
    })
}