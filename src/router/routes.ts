import type { Route } from "@/router/route";
import Analytics from "@/components/icons/analytics.vue";
import Public from "@/features/message/public.vue";
import Journal from "@/components/icons/journal.vue";
import Messages from "@/components/icons/messages.vue";
import Bookings from "@/components/icons/bookings.vue";
import Account from "@/features/account.vue";

const routes: Route[] = [
    {
        icon: Analytics,
        title: "Analytics",
        path: "/analytics",
        component: Public,
        auth: { guarded: true },
    },
    {
        icon: Journal,
        title: "Journals",
        path: "/journals",
        component: Public,
        auth: { guarded: true },
    },
    {
        icon: Messages,
        title: "Messages",
        path: "/messages",
        component: Public,
        auth: { guarded: true },
    },
    {
        icon: Bookings,
        title: "Bookings",
        path: "/bookings",
        component: Public,
        auth: { guarded: true },
    },
    {
        icon: Analytics,
        title: "Account",
        path: "/account",
        visible: false,
        component: Account,
        auth: { guarded: false },
    },
];

export function getRoutes(): Route[] {
    return routes;
}

export function getVisibleRoutes(): Route[] {
    return routes.filter((route: Route) => route.visible ?? true);
}
