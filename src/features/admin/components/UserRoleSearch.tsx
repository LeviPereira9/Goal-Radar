import { useState } from "react";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useUserSearch } from "@/features/users/hooks/useUserSearch";
import type { UserShortProfile } from "@/features/users/types/user";

interface UserRoleSearchProps {
    onSelect: (user: UserShortProfile) => void;
}

export function UserRoleSearch({onSelect}: UserRoleSearchProps){

    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 400);
    const {data, isLoading} = useUserSearch(debouncedSearch, 0);

    return (
        <div>
            <label htmlFor="userSearch">Buscar usuário</label>
            <input
                type="text"
                id="userSearch"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Digite um nome de usuário..."
            />

            {isLoading &&
                <p>Buscando...</p>
            }

            {data && (
                <ul>
                    {data.content.map((user) => (
                        <li key={user.id}>
                            <button
                                type="button"
                                onClick={() => onSelect(user)}
                            >
                            {user.username} ({user.role})
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}