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

export async function getToken(): Promise<string> {
    const { keycloak, isAuthenticated, isPending } = useKeycloak();

    if (isPending.value) throw new Error("Keycloak not ready");
    if (!isAuthenticated.value || !keycloak.value) {
        keycloak.value?.login();
        throw new Error("Not authenticated");
    }

    try {
        return await getKeycloakToken();
    } catch {
        keycloak.value.login();
        throw new Error("Token refresh failed");
    }
}
