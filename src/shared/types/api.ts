export interface ActionLink {
    action: string;
    method: string;
    url: string;
}

export interface ApiResponse<T> {
    operation: string;
    code: number;
    message: string;
    data: T;
    timestamp: string;
    fieldErrors?: Record<string, string>;
    actions?: ActionLink[]
}