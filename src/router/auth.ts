import { Role } from "@/models/roles";
import { useKeycloak } from "@josempgon/vue-keycloak";
import { watch } from "vue";
import { hasRoles } from "@/services/authentication";
import type { Router } from "vue-router";

const keycloak = useKeycloak();

export function initializeAuth(router: Router) {
    router.beforeEach(async (to, _from, next) => {
        if (keycloak.isPending.value) {
            await new Promise<void>((resolve) => {
                const unwatch = watch(
                    () => keycloak.isPending.value,
                    (pending: boolean) => {
                        if (pending) return;
                        unwatch();
                        resolve();
                    },
                );
            });
        }

        const guarded: boolean = to.meta.auth as boolean;
        const authenticated: boolean = keycloak.isAuthenticated.value;

        if (guarded && !authenticated) {
            keycloak.keycloak.value?.login();
            return next(false);
        }

        const roles: Role[] = to.meta.roles as Role[];
        if (guarded && !hasRoles(roles)) return next("/");

        next();
    });
}
