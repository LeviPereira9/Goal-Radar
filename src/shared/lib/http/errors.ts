import type { ApiResponse } from "@/shared/types";

export class ApiError extends Error {
    code: number;
    fieldErrors?: Record<string, string>;

    constructor(response: ApiResponse<unknown>){
        super(response.message);
        this.name = "ApiError";
        this.code = response.code;
        this.fieldErrors = response.fieldErrors;
    }
}

export class RateLimitError extends ApiError {
    constructor(response: ApiResponse<unknown>){
        super(response);
        this.name = "RateLimitError";
    }
}

export class UnauthorizedError extends ApiError {
    constructor(response: ApiResponse<unknown>){
        super(response);
        this.name = "UnauthorizedError";
    }
}

export class UnexpectedResponseError extends Error {
    status: number;

    constructor(status: number){
        super("A resposta do servidor não pôde ser interpretada.");
        this.name = "UnexpectedResponseError";
        this.status = status;
    }
}
