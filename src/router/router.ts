import { initializeAuth } from "@/router/auth";
import type { Route } from "@/router/route";
import { getAllRoutes } from "@/router/routes/routes";
import { initializeSlashes } from "@/router/slashes";
import {
    createRouter,
    createWebHistory,
    type RouteRecordRaw,
} from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            redirect: "/journals",
        },
        ...getAllRoutes().map((route: Route): RouteRecordRaw => {
            const base = {
                path: route.path,
                meta: {
                    title: route.title,
                    auth: route.auth.guarded,
                    roles: route.auth.roles ?? [],
                },
            };

            if (route.redirect) {
                return {
                    ...base,
                    redirect: route.redirect,
                };
            }

            return {
                ...base,
                component: route.component,
            };
        }),
    ],
});

initializeAuth(router);
initializeSlashes(router);
export default router;
