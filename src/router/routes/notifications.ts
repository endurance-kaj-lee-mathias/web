import NotificationsIcon from "@/components/icons/notifications.vue";
import Notifications from "@/features/notifications/notifications.vue";
import { Guarded, Visibility, type Route } from "@/router/route";

export const notifications: Route[] = [
    {
        icon: NotificationsIcon,
        title: "Notifications",
        path: "/notifications",
        visible: Visibility.ICON,
        component: Notifications,
        auth: { guarded: Guarded.PRIVATE },
    },
];
