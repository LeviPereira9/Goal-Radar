import { httpClient } from "@/shared/lib/http/client";
import type { Favorite } from "../types/favorite";

interface FavoritesResponse {
    favorites: Favorite[]
}

export const favoriteService = {
    getAll: (username: string) =>
        httpClient.get<FavoritesResponse>(`/api/v1/user/${username}/favorites`),

    add: (username: string, codeId: number) =>
        httpClient.put<void>(`/api/v1/user/${username}/favorites`, {codeId}),

    remove: (username: string, favoriteId: number) =>
        httpClient.delete<void>(`/api/v1/user/${username}/favorites`, {favoriteId}),
};