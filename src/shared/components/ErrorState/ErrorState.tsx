import { Button } from "../Button/Button";
import styles from "./ErrorState.module.css";

interface ErrorStateProps {
    title?: string;
    description?: string;
    onRetry?: () => void;
}

export function ErrorState({
    title = "Algo deu errado",
    description = "Não foi possível carregar essas informações. Tente novamente.",
    onRetry,
}:ErrorStateProps){
    return (
        <div className={styles.wrapper}>
            <span
                className={styles.icon}
                aria-hidden="true"
            >
                ⚠
            </span>
            <p className={styles.title}>{title}</p>
            <p className={styles.description}>{description}</p>
            {onRetry && (
                <Button
                    variant="secondary"
                    onClick={onRetry}
                >
                    Tentar novamente
                </Button>
            )}
        </div>
    )
}