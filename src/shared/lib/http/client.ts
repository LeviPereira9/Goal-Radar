import type { ApiResponse } from "@/shared/types";
import { API_BASE_URL } from "./config";
import { ApiError, RateLimitError, UnauthorizedError, UnexpectedResponseError } from "./errors";

type UnauthorizedHandler = () => void;

let onUnauthorized: UnauthorizedHandler | null = null;

export function registerUnauthorizedHandler(handler: UnauthorizedHandler){
    onUnauthorized = handler;
}

async function request<T>(
    path: string,
    options: RequestInit = {}
): Promise<T>{

    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        credentials: "include",
        "headers": {
            "Content-Type": "application/json",
            ...options.headers
        },
    });

    let body: ApiResponse<T>;

    try{
        body = await response.json();
    }catch{
        throw new UnexpectedResponseError(response.status);
    }
    

    if(!response.ok){
        if(response.status === 401){
            onUnauthorized?.();
            throw new UnauthorizedError(body);
        }

        if(response.status === 429){
            throw new RateLimitError(body);
        }

        throw new ApiError(body);
    }

    return body.data;
}

export const httpClient = {
  get: <T>(path: string) => request<T>(path, { method: 'GET' }),

  post: <T>(path: string, data?: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(data) }),

  put: <T>(path: string, data?: unknown) =>
    request<T>(path, { method: 'PUT', body: JSON.stringify(data) }),

  patch: <T>(path: string, data?: unknown) =>
    request<T>(path, { method: 'PATCH', body: JSON.stringify(data) }),

  delete: <T>(path: string, data?: unknown) =>
    request<T>(path, {
      method: 'DELETE',
      body: data ? JSON.stringify(data) : undefined,
    }),
};