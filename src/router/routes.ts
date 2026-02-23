import { Guarded, type Route } from "@/router/route";
import AnalyticsIcon from "@/components/icons/analytics.vue";
import JournalIcon from "@/components/icons/journal.vue";
import MessagesIcon from "@/components/icons/messages.vue";
import BookingsIcon from "@/components/icons/bookings.vue";
import Account from "@/features/account/account.vue";
import Info from "@/features/info/info.vue";
import Analytics from "@/features/analytics/analytics.vue";
import Journal from "@/features/journal/journal.vue";
import Messages from "@/features/messages/messages.vue";
import Bookings from "@/features/bookings/bookings.vue";

const info: Route[] = [
    {
        path: "/info",
        visible: false,
        component: Info,
        auth: { guarded: Guarded.PUBLIC },
    },
];

const account: Route[] = [
    {
        path: "/account",
        visible: false,
        component: Account,
        auth: { guarded: Guarded.PRIVATE },
    },
    {
        path: "/account/login",
        visible: false,
        component: Account,
        auth: { guarded: Guarded.ONLY_PUBLIC },
    },
];

const routes: Route[] = [
    {
        icon: AnalyticsIcon,
        title: "Analytics",
        path: "/analytics",
        component: Analytics,
        auth: { guarded: Guarded.PRIVATE },
    },
    {
        icon: JournalIcon,
        title: "Journals",
        path: "/journals",
        component: Journal,
        auth: { guarded: Guarded.PRIVATE },
    },
    {
        icon: MessagesIcon,
        title: "Messages",
        path: "/messages",
        component: Messages,
        auth: { guarded: Guarded.PRIVATE },
    },
    {
        icon: BookingsIcon,
        title: "Bookings",
        path: "/bookings",
        component: Bookings,
        auth: { guarded: Guarded.PRIVATE },
    },
];

export function getRoutes(): Route[] {
    return [...info, ...account, ...routes];
}

export function getVisibleRoutes(): Route[] {
    return getRoutes().filter((route: Route) => route.visible ?? true);
}
