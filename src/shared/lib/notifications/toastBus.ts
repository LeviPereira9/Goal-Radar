export type ToastType = "error" | "info" | "success";

type ToastHandler = (message: string, type: ToastType) => void;

let handler: ToastHandler | null = null;


export function registerToastHandler(newHandler: ToastHandler){
    handler = newHandler;
}

export function showToast(message: string, type: ToastType = "info"){
    handler?.(message, type);
}