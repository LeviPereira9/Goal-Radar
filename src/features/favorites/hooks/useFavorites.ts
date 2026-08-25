import { useQuery } from "@tanstack/react-query"; 
import { favoriteService } from "../services/favoriteService";

const FAVORITES_QUERY_KEY = (username: string) => ["favorites", username] as const;

export function useFavorites(username: string){
    return useQuery({
        queryKey: FAVORITES_QUERY_KEY(username),
        queryFn: () => favoriteService.getAll(username),
        enabled: !!username,
    });
}

export {FAVORITES_QUERY_KEY};