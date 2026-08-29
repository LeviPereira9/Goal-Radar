import styles from "./LoadingState.module.css";

interface LoadingStateProps {
    label?: string;
}

export function LoadingState({label = "Carregando..."}: LoadingStateProps){
    return(
        <div className={styles.wrapper}>
            <span className={styles.spinner} aria-hidden="true"/>
            <span className={styles.label}>{label}</span>
        </div>
    )
}