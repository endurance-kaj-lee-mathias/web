import type { UserId } from "@/features/network/models/user_id";

export interface User {
    id: UserId;
    firstName: string;
    lastName: string;
    username: string;
    image: string;
}
