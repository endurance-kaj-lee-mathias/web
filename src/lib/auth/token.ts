import { useKeycloak } from "@josempgon/vue-keycloak";
import { getToken as getKeycloakToken } from "@josempgon/vue-keycloak";
import { watch } from "vue";

export function waitForKeycloak(): Promise<void> {
    const { isPending } = useKeycloak();
    if (!isPending.value) return Promise.resolve();

    return new Promise((resolve) => {
        const unwatch = watch(isPending, (pending) => {
            if (!pending) {
                unwatch();
                resolve();
            }
        });
    });
}

export async function getToken(): Promise<string | undefined> {
    const { keycloak, isAuthenticated, isPending } = useKeycloak();

    if (isPending.value) return undefined;
    if (!isAuthenticated.value || !keycloak.value) return undefined;

    if (keycloak.value.refreshToken) {
        try {
            return await getKeycloakToken();
        } catch {
            keycloak.value.login();
            return undefined;
        }
    }

    if (keycloak.value.token && !keycloak.value.isTokenExpired()) {
        return keycloak.value.token;
    }

    keycloak.value.login();
    return undefined;
}
