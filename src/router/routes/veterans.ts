import VeteransIcon from "@/components/icons/veterans.vue";
import Requests from "@/features/veterans/requests/requests.vue";
import Veterans from "@/features/veterans/veterans/veterans.vue";
import { Guarded, Visibility, type Route } from "@/router/route";

export const veterans: Route[] = [
    {
        icon: VeteransIcon,
        title: "Veterans",
        path: "/veterans",
        visible: Visibility.BAR,
        component: Veterans,
        auth: { guarded: Guarded.PRIVATE },
    },
    {
        path: "/veterans/requests",
        visible: Visibility.NONE,
        component: Requests,
        auth: { guarded: Guarded.PRIVATE },
    },
];
