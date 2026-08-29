import { Link } from "react-router-dom"
import { useMe } from "@/features/auth/hooks/useMe"
import { useFavorites } from "../hooks/useFavorites"
import { useRemoveFavorite } from "../hooks/useToggleFavorite"
import styles from "./FavoritesPage.module.css";
import { Card } from "@/shared/components/Card/Card";
import { Button } from "@/shared/components/Button/Button";
import { LoadingState } from "@/shared/components/LoadingState/LoadingState";
import { ErrorState } from "@/shared/components/ErrorState/ErrorState";

export function FavoritesPage() {
  const {data: currentUser} = useMe();
  const username = currentUser?.username ?? "";
  
  const {data, isLoading, isError, refetch} = useFavorites(username);
  const removeFavorite = useRemoveFavorite(username);
  
  if(isLoading){
    return <LoadingState label="Carregando favoritos..." />
  }

  if(isError || !data){
    return <ErrorState description="Não foi possível carregar seus favoritos." onRetry={refetch} />
  }
  
  if(data.favorites.length === 0){
    return (
      <div className={styles.empty} >
        <h1 className={styles.title} >Favoritos</h1>
        <p className={styles.emptyText} >Você ainda não favoritou nenhuma competição.</p>
        <Link to="/competitions" >Ver competições</Link>
      </div>
    )
  }
  
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Favoritos</h1>
      <div className={styles.list}>
        {data.favorites.map((favorite) => (
          <Card className={styles.item} key={favorite.favoriteId}>
            <Link
              to={`/competitions/${favorite.code}`}
              className={styles.link}
            >
              <span className={styles.name} >{favorite.codeName}</span>
              <span className={styles.code} >{favorite.code}</span>
            </Link>
            <Button
              variant="secondary"
              onClick={() => removeFavorite.mutate(favorite.favoriteId)}
              disabled={removeFavorite.isPending}
            >
              Remover
            </Button>

          </Card>
        ))}
      </div>
    </div>
  )
}
