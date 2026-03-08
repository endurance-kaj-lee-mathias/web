import type { Status } from "@/features/veterans/requests/models/status";
import type { RequestId } from "@/features/veterans/requests/models/id";
import type { User } from "@/features/veterans/requests/models/user";

export interface Request {
    id: RequestId;
    sender: User;
    receiver: User;
    status: Status;
}
