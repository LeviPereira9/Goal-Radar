import { useMe } from "@/features/auth/hooks/useMe";
import { useFavorites } from "../hooks/useFavorites";
import { useAddFavorite, useRemoveFavorite } from "../hooks/useToggleFavorite";

interface FavoriteButtonProps {
    codeId: number;
}

export function FavoriteButton({codeId}: FavoriteButtonProps){

    const { data: currentUser } = useMe();
    const username = currentUser?.username ?? "";

    const { data: favoritesData } = useFavorites(username);
    const addFavorite = useAddFavorite(username);
    const removeFavorite = useRemoveFavorite(username);

    if(!currentUser || !favoritesData){
        return null;
    }

    const existingFavorite = favoritesData.favorites.find(
        (fav) => fav.codeId === codeId
    );

    const isPending = addFavorite.isPending || removeFavorite.isPending;

    const handleToggle = () => {
        if(existingFavorite){
            removeFavorite.mutate(existingFavorite.favoriteId);
        } else {
            addFavorite.mutate(codeId);
        }
    }
    
    return (
        <button
            onClick={handleToggle}
            disabled={isPending}
        >
            {existingFavorite ? "Favoritado" : "Favoritar"}
        </button>
    )
}