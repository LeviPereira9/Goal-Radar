import { useState } from "react";
import styles from "./UserAvatar.module.css";

interface UserAvatarProps{
    src?: string;
    username: string;
    size?: "sm" | "md" | "lg";
}

export function UserAvatar({src, username, size = "md"}:UserAvatarProps){
    const [hasError, setHasError] = useState(false);
    const showFallback = !src || hasError;

    if(showFallback){
        return(
            <span 
                className={`${styles.avatar} ${styles.fallback} ${styles[size]}`}
                role="img"
                aria-label={username}
            >
                {username.charAt(0).toUpperCase()}
            </span>
        )
    }
    
    return (
        <img
            src={src}
            alt={username}
            className={`${styles.avatar} ${styles[size]}`}
            onError={() => setHasError(true)}
        />
    )
}