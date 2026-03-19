import MessagesIcon from "@/components/icons/messages.vue";
import Chat from "@/features/chat/chat.vue";
import { Guarded, Visibility, type Route } from "@/router/route";

export const messages: Route[] = [
    {
        icon: MessagesIcon,
        title: "Messages",
        path: "/messages",
        visible: Visibility.ICON,
        component: Chat,
        auth: { guarded: Guarded.PRIVATE },
    },
];
