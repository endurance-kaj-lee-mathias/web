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

export function getRoutes(): Route[] {
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

export function getRoutesBasedOnVisibility(visibility: Visibility): Route[] {
    return getRoutes().filter((route: Route) => route.visible === visibility);
}
