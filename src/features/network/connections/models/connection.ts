import type { ConnectionId } from "@/features/network/models/id";
import type { Role } from "@/features/network/connections/models/role";

export interface Connection {
    id: ConnectionId;
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    image: string;
    role: Role;
}
