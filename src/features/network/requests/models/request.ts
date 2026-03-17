import type { Status } from "@/features/network/requests/models/status";
import type { RequestId } from "@/features/network/requests/models/id";
import type { User } from "@/features/network/requests/models/user";

export interface Request {
    id: RequestId;
    sender: User;
    receiver: User;
    status: Status;
    note: string | null;
}
