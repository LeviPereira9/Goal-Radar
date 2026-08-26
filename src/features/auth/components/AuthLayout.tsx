import type { ReactNode } from "react";
import { Card } from "@/shared/components/Card/Card";
import styles from "./AuthLayout.module.css";

interface AuthLayoutProps {
    title: string;
    children: ReactNode;
}

export function AuthLayout({title, children}: AuthLayoutProps){
    return (
        <div className={styles.wrapper}>
            <Card className={styles.card} >
                <h1 className={styles.title}>{title}</h1>
                {children}
            </Card>
        </div>
    )
}