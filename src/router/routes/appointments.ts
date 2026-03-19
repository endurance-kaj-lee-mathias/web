import AppointsmentsIcon from "@/components/icons/appointments.vue";
import Bookings from "@/features/appointments/appointments.vue";
import New from "@/features/appointments/new.vue";
import { Role } from "@/models/roles";
import { Guarded, Visibility, type Route } from "@/router/route";

export const appointments: Route[] = [
    {
        icon: AppointsmentsIcon,
        title: "Appointments",
        path: "/appointments",
        visible: Visibility.BAR,
        component: Bookings,
        auth: { guarded: Guarded.PRIVATE },
    },
    {
        path: "/appointments/new",
        visible: Visibility.NONE,
        component: New,
        auth: { guarded: Guarded.PRIVATE, roles: [Role.VETERAN] },
    },
];
