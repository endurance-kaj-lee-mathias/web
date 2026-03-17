import VeteransIcon from "@/components/icons/veterans.vue";
import Requests from "@/features/network/requests/requests.vue";
import Connections from "@/features/network/connections/connections.vue";
import { Guarded, Visibility, type Route } from "@/router/route";

export const network: Route[] = [
    {
        icon: VeteransIcon,
        title: "Network",
        path: "/network/connections",
        visible: Visibility.BAR,
        component: Connections,
        auth: { guarded: Guarded.PRIVATE },
    },
    {
        path: "/network/requests",
        visible: Visibility.NONE,
        component: Requests,
        auth: { guarded: Guarded.PRIVATE },
    },
];
