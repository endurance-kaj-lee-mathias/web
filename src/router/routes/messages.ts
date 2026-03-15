import MessagesIcon from "@/components/icons/messages.vue";
import Messages from "@/features/messages/messages.vue";
import { Guarded, Visibility, type Route } from "@/router/route";

export const messages: Route[] = [
    {
        icon: MessagesIcon,
        title: "Messages",
        path: "/messages",
        visible: Visibility.ICON,
        component: Messages,
        auth: { guarded: Guarded.PRIVATE },
    },
];
