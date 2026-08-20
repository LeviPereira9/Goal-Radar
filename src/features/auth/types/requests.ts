export interface LoginRequest {
    login: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    dateOfBirth: string;
}