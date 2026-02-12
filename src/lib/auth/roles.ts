import { useKeycloak } from "@josempgon/vue-keycloak";

export const Role = {
    ADMIN: "admin",
} as const;

export type Role = (typeof Role)[keyof typeof Role];

export function hasRoles(roles: Role[]): boolean {
    const keycloak = useKeycloak();
    if (keycloak.isPending.value) return false;
    return roles.some((role: Role) => keycloak.roles.value.includes(role));
}
