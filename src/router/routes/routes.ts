import { Visibility, type Route } from "@/router/route";
import { auth } from "@/router/routes/auth";
import { appointments } from "@/router/routes/appointments";
import { journals } from "@/router/routes/journals";
import { messages } from "@/router/routes/messages";
import { profile } from "@/router/routes/profile";
import { network } from "@/router/routes/network";

export function getAllRoutes(): Route[] {
    return [
        ...auth,
        ...journals,
        ...appointments,
        ...network,
        ...messages,
        ...profile,
    ];
}

export function getRoutes(visibility: Visibility): Route[] {
    return getAllRoutes().filter(
        (route: Route) => route.visible === visibility,
    );
}
