import { Link } from "react-router-dom";
import { Button } from "@/shared/components/Button/Button";
import styles from "./StatePage.module.css";

interface StatePageProps{
    code: string;
    title: string;
    description: string;
}

export function StatePage({code, title, description}: StatePageProps){
    return (
        <div className={styles.wrapper}>
            <span className={styles.code}>{code}</span>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.description}>{description}</p>
            <Link to="/">
                <Button>Voltar para o início</Button>
            </Link>
        </div>
    )
}