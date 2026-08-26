import { getErrorDisplay } from "@/shared/lib/http/errorDisplay";

interface ApiErrorDisplayProps {
    error: unknown;
    fallbackMessage: string;
}

export function ApiErrorDisplay({error, fallbackMessage} : ApiErrorDisplayProps) {
    const display = getErrorDisplay(error, fallbackMessage);

    if(!display){
        return null;
    }

    return display.type === "fieldErrors" && display.errors ? (
        <ul role="alert">
            {Object.entries(display.errors).map(([field, message]) => (
                <li key={field}>{message}</li>
            ))}
        </ul>
    ) : (
        <p role="alert">{display.text}</p>
    )
}