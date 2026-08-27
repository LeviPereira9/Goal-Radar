import { useState } from "react";
import styles from "./TeamEmblem.module.css";

interface TeamEmblemProps {
    src?: string;
    teamName: string;
    size?: "sm" | "md";
}

export function TeamEmblem({src, teamName, size = "sm"}: TeamEmblemProps){

    const [hasError, setHasError] = useState(false);

    const showFallback = !src || hasError;

    if(showFallback){
        return(
            <span
                className={`${styles.emblem} ${styles.fallback} ${styles[size]}`}
                role="img"
                aria-label={teamName}
            >
                {teamName.charAt(0).toUpperCase()}
            </span>
        )
    }
    
    return (
        <img
            className={`${styles.emblem} ${styles[size]}`}
            src={src}
            alt={teamName}
            onError={() => setHasError(true)}
        />
    )
}