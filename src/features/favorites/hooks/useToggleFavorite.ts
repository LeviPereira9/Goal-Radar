import { useMutation, useQueryClient } from "@tanstack/react-query";
import { favoriteService } from "../services/favoriteService";
import { FAVORITES_QUERY_KEY } from "./useFavorites";

export function useAddFavorite(username: string){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (competitionCodeId: number) => favoriteService.add(username, competitionCodeId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: FAVORITES_QUERY_KEY(username)
            })
        }
    })
}

export function useRemoveFavorite(username: string){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (favoriteId: number) => favoriteService.remove(username, favoriteId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: FAVORITES_QUERY_KEY(username)
            })
        }
    })
}