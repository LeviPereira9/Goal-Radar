import { Link } from "react-router-dom"; 
import { useMe } from "@/features/auth/hooks/useMe";
import { useFavorites } from "@/features/favorites/hooks/useFavorites";
import styles from "./FavoritesBar.module.css";

export function FavoritesBar(){
    const { data: currentUser } = useMe();
    const { data } = useFavorites(currentUser?.username ?? "");

    if(!data || data.favorites.length === 0) {
        return null;
    }

    return (
        <div className={styles.bar}>
            <div className={styles.inner}>
                <span className={styles.label}>Favoritos:</span>
                <div className={styles.list}>
                    {data.favorites.map((favorite) => (
                        <Link
                            className={styles.chip}
                            key={favorite.favoriteId}
                            to={`/competitions/${favorite.code}`}
                        >
                            {favorite.codeName}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}