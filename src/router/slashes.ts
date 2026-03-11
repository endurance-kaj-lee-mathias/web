import Profile from "@/features/profile/profile.vue";
import { Guarded, Visibility, type Route } from "@/router/route";
import type { Router } from "vue-router";

export function initializeSlashes(router: Router) {
    router.beforeEach((to, from, next) => {
        if (to.path.length > 1 && to.path.endsWith("/")) {
            next({
                path: to.path.replace(/\/+$/, ""),
                query: to.query,
                hash: to.hash,
                replace: true,
            });

            return;
        }

        next();
    });
}
