import { hasRoles, Role } from "@/lib/auth/roles";
import { useKeycloak } from "@josempgon/vue-keycloak";
import { watch } from "vue";
import {
    createRouter,
    createWebHistory,
    type RouteRecordRaw,
} from "vue-router";
import type { Route } from "@/router/route";
import { getRoutes } from "@/router/routes";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            redirect: "/account",
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
router.beforeEach((to, _from, next) => {
    const keycloak = useKeycloak();

    if (keycloak.isPending.value) {
        const unwatch = watch(
            () => keycloak.isPending.value,
            (pending: boolean) => {
                if (pending) return;
                unwatch();
                next(to.path);
            },
        );

        return;
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
