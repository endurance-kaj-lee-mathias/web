import type { UserId } from "@/features/veterans/models/user_id";
import type { Status } from "@/features/veterans/requests/models/status";

export interface Request {
    sender: UserId;
    receiver: UserId;
    status: Status;
}
