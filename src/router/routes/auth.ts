import Profile from "@/features/profile/profile.vue";
import { Guarded, Visibility, type Route } from "@/router/route";

export const auth: Route[] = [
    {
        path: "/profile",
        visible: Visibility.NONE,
        component: Profile,
        auth: { guarded: Guarded.PRIVATE },
    },
    {
        path: "/auth/login",
        visible: Visibility.NONE,
        component: Profile,
        auth: { guarded: Guarded.ONLY_PUBLIC },
    },
];
