import { useState } from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useUserSearch } from "../../hooks/useUserSearch";
import { TextField } from "@/shared/components/TextField/TextField";
import { Card } from "@/shared/components/Card/Card";
import { Button } from "@/shared/components/Button/Button";
import styles from "./UserSearchPage.module.css";

export function UserSearchPage(){
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const debouncedSearch = useDebounce(search, 400);

    const {data, isLoading, isFetching} = useUserSearch(debouncedSearch, page);

    const handleSearchChange = (value: string) => {
        setSearch(value);
        setPage(0);
    }

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Buscar usuários</h1>
            
            <TextField
                label="Nome de usuário"
                type="text"
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Digite um nome de usuário"
            />
            {isLoading && <p>Buscando...</p> }
            
            {data && (
                <>
                    <div className={styles.list}>
                        {data.content.map((user) => (
                            <Card
                                key={user.id}
                                className={styles.item}
                                >
                                    <Link
                                        className={styles.link}
                                        to={`/users/${user.username}`}>
                                            <span className={styles.username}>{user.username}</span>
                                            {user.bio &&
                                                <span className={styles.bio}>{user.bio}</span>
                                            }
                                            </Link>
                            </Card>
                        ))}
                    </div>

                    {data.content.length === 0 &&
                        <p className={styles.text}>Nenhum usuário encontrado.</p>
                    }
                    
                    {data.content.length > 0 && (
                        <div className={styles.pagination}>
                            <Button
                                variant="secondary"
                                disabled={!data.hasPrevious || isFetching}
                                onClick={() => setPage((p) => p - 1)}
                            >Anterior</Button>
                            <span className={styles.pageLabel}>
                                Página {data.page} de {data.totalPages || 1}
                            </span>
                            <Button
                                variant="secondary"
                                disabled={!data.hasNext || isFetching}
                                onClick={() => setPage((p) => p + 1)}
                            >
                                Próxima
                            </Button>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

