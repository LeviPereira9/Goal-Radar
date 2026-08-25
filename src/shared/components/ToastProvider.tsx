import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { registerToastHandler, type ToastType } from "../lib/notifications/toastBus";

interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

let nextId = 0;

export function ToastProvider({children}: {children: React.ReactNode}){
    const [toasts, setToasts] = useState<Toast[]>([]);

    const removeToast = useCallback((id: number) => {
        setToasts((current) => current.filter((t) => t.id !== id));
    }, []);

    const addToast = useCallback(
        (message: string, type: ToastType) => {
            const id = nextId++;
            setToasts((current) => [...current, {id, message, type}]);
            setTimeout(() => removeToast(id), 5000);
        },
        [removeToast]
    );
    
    useEffect(() => {
        registerToastHandler(addToast);
    }, [addToast]);

    return (
        <>
            {children}
            {createPortal(
                <div
                    role="status"
                    aria-live="polite"
                >
                    {toasts.map((toast) => (
                        <div
                            key={toast.id}
                            data-type={toast.type}
                        >
                            {toast.message}
                            <button
                                onClick={() => removeToast(toast.id)}
                                aria-label="fechar aviso"
                            >
                                X
                            </button>
                        </div>
                    ))}
                </div>,
                document.body
            )}
        </>
    )
    
}