import BookingsIcon from "@/components/icons/bookings.vue";
import JournalIcon from "@/components/icons/journal.vue";
import MessagesIcon from "@/components/icons/messages.vue";
import NotificationsIcon from "@/components/icons/notifications.vue";
import ProfileIcon from "@/components/icons/profile.vue";
import VeteransIcon from "@/components/icons/veterans.vue";
import Bookings from "@/features/bookings/bookings.vue";
import Journal from "@/features/journal/journal.vue";
import Messages from "@/features/messages/messages.vue";
import Notifications from "@/features/notifications/notifications.vue";
import Profile from "@/features/profile/profile.vue";
import Veterans from "@/features/veterans/veterans/veterans.vue";
import { Guarded, Visibility, type Route } from "@/router/route";

export const journals: Route[] = [
    {
        icon: JournalIcon,
        title: "Journals",
        path: "/journals",
        visible: Visibility.BAR,
        component: Journal,
        auth: { guarded: Guarded.PRIVATE },
    },
];

export const bookings: Route[] = [
    {
        icon: BookingsIcon,
        title: "Bookings",
        path: "/bookings",
        visible: Visibility.BAR,
        component: Bookings,
        auth: { guarded: Guarded.PRIVATE },
    },
];

export const veterans: Route[] = [
    {
        icon: VeteransIcon,
        title: "Veterans",
        path: "/veterans",
        visible: Visibility.BAR,
        component: Veterans,
        auth: { guarded: Guarded.PRIVATE },
    },
];

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

export const profile: Route[] = [
    {
        icon: ProfileIcon,
        title: "Profile",
        path: "/profile",
        visible: Visibility.BAR,
        component: Profile,
        auth: { guarded: Guarded.PRIVATE },
    },
];
