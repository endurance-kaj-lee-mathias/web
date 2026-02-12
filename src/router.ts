import Protected from "@/features/message/protected.vue";
import Public from "@/features/message/public.vue";
import { hasRoles, Role } from "@/lib/auth/roles";
import { useKeycloak } from "@josempgon/vue-keycloak";
import { watch } from "vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: "/", component: Public },
        {
            path: "/message",
            component: Protected,
            meta: { auth: true, roles: [Role.ADMIN] },
        },
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
