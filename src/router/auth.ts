import { Role } from "@/models/roles";
import { hasRoles } from "@/services/authentication";
import { useKeycloak } from "@josempgon/vue-keycloak";
import { watch } from "vue";
import type { Router } from "vue-router";

const keycloak = useKeycloak();

async function ensureValidToken(): Promise<boolean> {
    if (!keycloak.keycloak.value) return false;

    if (!keycloak.keycloak.value.refreshToken) return false;

    try {
        await keycloak.keycloak.value.updateToken(30);
        return true;
    } catch {
        return false;
    }
}

export function initializeAuth(router: Router) {
    router.beforeEach(async (to, _from, next) => {
        if (keycloak.isPending.value) {
            await new Promise<void>((resolve) => {
                const unwatch = watch(
                    () => keycloak.isPending.value,
                    (pending: boolean) => {
                        if (!pending) {
                            unwatch();
                            resolve();
                        }
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

        if (authenticated) {
            const tokenValid = await ensureValidToken();

            if (!tokenValid && guarded) {
                keycloak.keycloak.value?.login();
                return next(false);
            }
        }

        const roles: Role[] = to.meta.roles as Role[];
        if (guarded && roles?.length && !hasRoles(roles)) return next("/");

        next();
    });
}
