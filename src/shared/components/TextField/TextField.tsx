import { forwardRef, type InputHTMLAttributes } from "react";
import styles from "./TextField.module.css";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement>{
    label: string;
    error?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(({label, error, id, ... rest}, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className={styles.field}>
            <label
                htmlFor={inputId}
                className={styles.label}
            >
                {label}
            </label>
            <input
                id={inputId}
                ref={ref}
                className={`${styles.input} ${error ? styles.inputError : ""}`}
                {...rest}
            />
            {error &&
                <span className={styles.error}>{error}</span>
            }
        </div>
    )
});

TextField.displayName = "TextField";
