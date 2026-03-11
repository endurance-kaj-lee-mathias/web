import type { Request } from "@/features/veterans/requests/models/request";

export interface Requests {
    incoming: Request[];
    outgoing: Request[];
}
