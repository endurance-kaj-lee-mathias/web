export const Role = {
    ADMIN: "admin",
    VETERAN: "veteran",
} as const;

export type Role = (typeof Role)[keyof typeof Role];
