import { Link } from "react-router-dom"
import { useMe } from "@/features/auth/hooks/useMe"
import { useFavorites } from "../hooks/useFavorites"
import { useRemoveFavorite } from "../hooks/useToggleFavorite"

export function FavoritesPage() {
  const {data: currentUser} = useMe();
  const username = currentUser?.username ?? "";
  
  const {data, isLoading, isError} = useFavorites(username);
  const removeFavorite = useRemoveFavorite(username);
  
  if(isLoading){
    return <div>Carregando favoritos...</div>
  }

  if(isError || !data){
    return <div>Não foi possível carregar seus favoritos.</div>
  }
  
  if(data.favorites.length === 0){
    return (
      <div>
        <h1>Favoritos</h1>
        <p>Você ainda não favoritou nenhuma competição.</p>
        <Link to="/competitions" >Ver competições</Link>
      </div>
    )
  }
  
  return (
    <div>
      <h1>Favoritos</h1>
      <ul>
        {data.favorites.map((favorite) => (
          <li key={favorite.favoriteId}>
            <Link
              to={`/competitions/${favorite.code}`}
            >{favorite.codeName}
            </Link>
            <button
              onClick={() => removeFavorite.mutate(favorite.favoriteId)}
              disabled={removeFavorite.isPending}
            >
              Remover
            </button>

          </li>
        ))}
      </ul>
    </div>
  )
}
