import { useState } from "react";

interface TeamEmblemProps {
    src?: string;
    teamName: string;
    size?: number;
}

export function TeamEmblem({src, teamName, size = 24}: TeamEmblemProps){

    const [hasError, setHasError] = useState(false);

    const showFallback = !src || hasError;

    if(showFallback){
        return(
            <span
                role="img"
                aria-label={teamName}
                style={{
                    display: "inline-block",
                    width: size,
                    height: size,
                    borderRadius: "50%",
                    background: "#ddd",
                    textAlign: "center",
                    lineHeight: `${size}px`,
                    fontSize: size * 0.5,
                }}
            >
                {teamName.charAt(0).toUpperCase()}
            </span>
        )
    }
    
    return (
        <img
            src={src}
            alt={teamName}
            width={size}
            height={size}
            onError={() => setHasError(true)}
        />
    )
}