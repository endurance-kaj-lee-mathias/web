import type { SlotId } from "@/features/bookings/models/slot/id";

export interface Slot {
    id: SlotId;
    startTime: Date;
    endTime: Date;
}
