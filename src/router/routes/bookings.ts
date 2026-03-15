import BookingsIcon from "@/components/icons/bookings.vue";
import Bookings from "@/features/bookings/bookings.vue";
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
];
