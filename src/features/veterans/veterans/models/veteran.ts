import type { VeteranId } from "@/features/veterans/models/id";

export interface Veteran {
    id: VeteranId;
    email: string;
    firstName: string;
    lastName: string;
    username: string;
}
