import { ApiError, RateLimitError } from "./errors";

export type ErrorDisplay = 
|{type: "fieldErrors"; errors: Record<string, string>}
|{type: "message"; text: string};

export function getErrorDisplay(error: unknown, fallbackMessage: string){

    if(error instanceof RateLimitError) return;
    
    if(error instanceof ApiError && error.fieldErrors && Object.keys(error.fieldErrors).length > 0){
        return {type: "fieldErrors", errors: error.fieldErrors};
    }

    return {
        type: "message",
        text: error instanceof ApiError ? error.message : fallbackMessage,
    };
}
