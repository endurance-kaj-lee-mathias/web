import BookingsIcon from "@/components/icons/bookings.vue";
import Bookings from "@/features/bookings/bookings.vue";
import New from "@/features/bookings/new.vue";
import { Role } from "@/models/roles";
import { Guarded, Visibility, type Route } from "@/router/route";

export const bookings: Route[] = [
    {
        icon: BookingsIcon,
        title: "Bookings",
        path: "/bookings",
        visible: Visibility.BAR,
        component: Bookings,
        auth: { guarded: Guarded.PRIVATE },
    },
    {
        path: "/bookings/new",
        visible: Visibility.NONE,
        component: New,
        auth: { guarded: Guarded.PRIVATE, roles: [Role.VETERAN] },
    },
];
