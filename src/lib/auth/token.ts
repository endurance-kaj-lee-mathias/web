import { getToken as getKeycloakToken } from "@josempgon/vue-keycloak";

export async function getToken(): Promise<string | undefined> {
    try {
        return await getKeycloakToken();
    } catch {
        return undefined;
    }
}
