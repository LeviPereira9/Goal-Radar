import { isValidElement, type ReactNode } from "react";
import styles from "./StatusMessage.module.css";

type StatusType = "error" | "success" | "warning" | "info";

interface StatusMessageProps {
    type: StatusType;
    children: ReactNode;
}

const ROLE_BY_TYPE: Record<StatusType, "alert" | "status"> = {
    error: "alert",
    success: "status",
    warning: "status",
    info: "status"
}

export function StatusMessage({type, children}: StatusMessageProps){
    if(!isValidElement(children)){
        return null;
    }
    
    return (
        <div role={ROLE_BY_TYPE[type]} className={`${styles.message} ${styles[type]}`}>
            {children}
        </div>
    )
}