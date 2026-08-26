import { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./Drawer.module.css";

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export function Drawer({isOpen, onClose, title, children}: DrawerProps){
    useEffect(() => {
        if(!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if(e.key === 'Escape') onClose();
        };

        document.addEventListener("keydown", handleKeyDown);

        return() => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if(!isOpen) return null;

    return createPortal(
        <div
            className={styles.overlay}
            role="presentation"
            onClick={onClose}>
            <div
                className={styles.panel}
                role="dialog"
                aria-modal="true"
                aria-label={title}
                onClick={(e) => e.stopPropagation()}
            >
                <header className={styles.header}>
                    <h2 className={styles.title}>{title}</h2>
                    <button
                        className={styles.closeButton}
                        onClick={onClose}
                        aria-label="Fechar"
                    >X</button>
                </header>
                <div className={styles.content} >{children}</div>
            </div>
        </div>,
        document.body
    )
}