import type { ConnectionId } from "@/features/network/models/id";

export interface Connection {
    id: ConnectionId;
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    image: string;
}
