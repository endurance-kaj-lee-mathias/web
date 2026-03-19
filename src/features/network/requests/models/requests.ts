import type { Request } from "@/features/network/requests/models/request";

export interface Requests {
    incoming: Request[];
    outgoing: Request[];
}
