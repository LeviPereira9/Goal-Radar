import { useEffect } from "react";
import { createPortal } from "react-dom";

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
            role="presentation"
            onClick={onClose}>
            <div
                role="dialog"
                aria-modal="true"
                aria-label={title}
                onClick={(e) => e.stopPropagation()}
            >
                <header>
                    <h2>{title}</h2>
                    <button
                        onClick={onClose}
                        aria-label="Fechar"
                    >X</button>
                </header>
                <div>{children}</div>
            </div>
        </div>,
        document.body
    )
}