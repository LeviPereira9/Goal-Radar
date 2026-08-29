import type { ButtonHTMLAttributes } from "react"; 
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "danger" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    variant?: Variant;
    isLoading?: boolean;
}

export function Button({variant = "primary", className, isLoading, children, disabled, ...rest}: ButtonProps){
    const classes = [styles.button, styles[variant], className].filter(Boolean).join(" ");

    return <button
            className={classes}
            {...rest}
            disabled={disabled || isLoading}
        >
        {isLoading &&
            <span className={styles.spinner} aria-hidden="true"/>
        }
        <span className={isLoading ? styles.loadingText : ""}>{children}</span>
    </button>
}