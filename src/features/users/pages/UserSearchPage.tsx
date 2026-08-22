import { useState } from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useUserSearch } from "../hooks/useUserSearch";

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
        <div>
            <h1>Buswcar usuários</h1>

            <input
                type="text"
                placeholder="Digite um nome de usuário..."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
            />

            {isLoading && <p>Buscando...</p> }
            
            {data && (
                <>
                    <ul>
                        {data.content.map((user) => (
                            <li key={user.id}>
                                <Link to={`/users/${user.username}`}>{user.username}</Link>
                            </li>
                        ))}
                    </ul>

                    {data.content.length === 0 &&
                        <p>Nenhum usuário encontrado.</p>
                    }
                    
                    <div>
                        <button
                            disabled={!data.hasPrevious || isFetching}
                            onClick={() => setPage((p) => p - 1)}
                        >Anterior</button>
                    </div>
                    <span>
                        Página {data.page} de {data.totalPages || 1}
                    </span>
                    <button
                        disabled={!data.hasNext || isFetching}
                        onClick={() => setPage((p) => p + 1)}
                    >Próxima</button>
                </>
            )}
        </div>
    )
}