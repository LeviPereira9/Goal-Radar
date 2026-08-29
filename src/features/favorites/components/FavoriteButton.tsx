import { useMe } from "@/features/auth/hooks/useMe";
import { useFavorites } from "../hooks/useFavorites";
import { useAddFavorite, useRemoveFavorite } from "../hooks/useToggleFavorite";
import { Button } from "@/shared/components/Button/Button";
import { ErrorState } from "@/shared/components/ErrorState/ErrorState";

interface FavoriteButtonProps {
    codeId: number;
}

export function FavoriteButton({codeId}: FavoriteButtonProps){

    const { data: currentUser, isError: userError } = useMe();
    const username = currentUser?.username ?? "";

    const { data: favoritesData, isError: favoritesError } = useFavorites(username);
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

    if(userError || favoritesError) {
        return <ErrorState/>
    }
    
    return (
        <Button
            variant={existingFavorite ? "secondary" : "primary"}
            onClick={handleToggle}
            disabled={isPending}
        >
            {existingFavorite ? "Favoritado" : "Favoritar"}
        </Button>
    )
}