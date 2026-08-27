import type { ReactNode } from "react";
import { Card } from "@/shared/components/Card/Card";
import styles from "./UserActionLayout.module.css";


interface UserActionLayoutProps {
    title: string;
    description?: string;
    children: ReactNode;
}

export function UserActionLayout({
    title,
    description,
    children
}: UserActionLayoutProps){
    return (
        <div className={styles.wrapper}>
            <Card className={styles.card}>
                <h1 className={styles.title}>{title}</h1>
                {description &&
                    <p className={styles.description}>{description}</p>
                }
                {children}
            </Card>
        </div>
    )
}