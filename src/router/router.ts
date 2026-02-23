import { Role } from "@/models/roles";
import { useKeycloak } from "@josempgon/vue-keycloak";
import { watch } from "vue";
import {
    createRouter,
    createWebHistory,
    type RouteRecordRaw,
} from "vue-router";
import type { Route } from "@/router/route";
import { getRoutes } from "@/router/routes/routes";
import { hasRoles } from "@/services/authentication";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            redirect: "/profile",
        },
        ...getRoutes().map(
            (route: Route): RouteRecordRaw => ({
                path: route.path,
                component: route.component,
                meta: {
                    title: route.title,
                    auth: route.auth.guarded,
                    roles: route.auth.roles ?? [],
                },
            }),
        ),
    ],
});

const keycloak = useKeycloak();

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

export default router;
