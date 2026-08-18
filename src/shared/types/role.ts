export const Role = {
    USER: 'USER',
    MOD: 'MOD',
    ADMIN: 'ADMIN',
    SUPER_ADMIN: 'SUPER_ADMIN'
} as const;

export type Role = (typeof Role)[keyof typeof Role];

export const ROLE_HIERARCHY: Record<Role, number> = {
    USER: 1,
    MOD: 2,
    ADMIN: 3,
    SUPER_ADMIN: 4,
}