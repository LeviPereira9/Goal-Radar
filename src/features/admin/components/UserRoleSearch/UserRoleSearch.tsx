import { useState } from "react";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useUserSearch } from "@/features/users/hooks/useUserSearch";
import type { UserShortProfile } from "@/features/users/types/user";
import styles from "./UserRoleSearch.module.css";
import { TextField } from "@/shared/components/TextField/TextField";
import { Card } from "@/shared/components/Card/Card";
import { UserAvatar } from "@/shared/components/UserAvatar/UserAvatar";
import { LoadingState } from "@/shared/components/LoadingState/LoadingState";

interface UserRoleSearchProps {
    onSelect: (user: UserShortProfile) => void;
}

export function UserRoleSearch({onSelect}: UserRoleSearchProps){

    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 400);
    const {data, isLoading} = useUserSearch(debouncedSearch, 0);

    return (
        <div>
            <TextField
                label="Buscar usuário"
                type="text"
                value={search}
                onChange={((e) => setSearch(e.target.value))}
                placeholder="Digite um nome de usuário..."
            />
            {isLoading &&
                <LoadingState label="Buscando..." />
            }

            {data && (
                <div className={styles.list}>
                    {data.content.map((user) => (
                        <Card
                            key={user.id}
                            className={styles.item}
                            onClick={() => onSelect(user)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === "Enter" && onSelect(user)}
                        >
                            <UserAvatar
                                src={user.profilePicture}
                                username={user.username}
                                size="sm"
                            />
                            <div>
                                <span className={styles.username}>{user.username}</span>
                                <span className={styles.role}>{user.role}</span>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}