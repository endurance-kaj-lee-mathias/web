import { Visibility, type Route } from "@/router/route";
import { auth } from "@/router/routes/auth";
import {
    bookings,
    journals,
    messages,
    notifications,
    profile,
    veterans,
} from "@/router/routes/pages";

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
