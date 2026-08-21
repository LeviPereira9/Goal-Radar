import type { Role } from "@/shared/types";

export interface UserShortProfile {
    id: number;
    profilePicture?: string;
    username: string;
    bio?: string;
    createdAt: string;
    role: Role;
}

export interface UserProfile {
    id: number;
    profilePicture?: string;
    username: string;
    email: string;
    bio?: string;
    dateOfBirth: string;
    createdAt: string;
    verified: boolean;
    role: Role;
}