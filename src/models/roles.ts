export const Role = {
    ADMIN: "admin",
    VETERAN: "veteran",
    THERAPIST: "therapist",
} as const;

export type Role = (typeof Role)[keyof typeof Role];
