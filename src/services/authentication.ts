import type { Role } from "@/models/roles";
import { useKeycloak } from "@josempgon/vue-keycloak";

export function hasRoles(roles: Role[]): boolean {
    const keycloak = useKeycloak();
    if (keycloak.isPending.value) return false;
    return roles.some((role: Role) => keycloak.roles.value.includes(role));
}
