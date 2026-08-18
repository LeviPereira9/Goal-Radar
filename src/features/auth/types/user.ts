import type { Role } from "@/shared/types";

export interface AuthUser {
    id: number;
    profilePicture?: string;
    username: string;
    bio?: string;
    createdAt: string;
    role: Role;
}