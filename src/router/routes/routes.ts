import { Visibility, type Route } from "@/router/route";
import { auth } from "@/router/routes/auth";
import { bookings } from "@/router/routes/bookings";
import { journals } from "@/router/routes/journals";
import { messages } from "@/router/routes/messages";
import { notifications } from "@/router/routes/notifications";
import { profile } from "@/router/routes/profile";
import { veterans } from "@/router/routes/veterans";

export function getAllRoutes(): Route[] {
    return [
        ...auth,
        ...journals,
        ...bookings,
        ...veterans,
        ...notifications,
        ...messages,
        ...profile,
    ];
}

export function getRoutes(visibility: Visibility): Route[] {
    return getAllRoutes().filter(
        (route: Route) => route.visible === visibility,
    );
}
