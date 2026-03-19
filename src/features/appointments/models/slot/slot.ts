import type { SlotId } from "@/features/appointments/models/slot/id";

export interface Slot {
    id: SlotId;
    startTime: Date;
    endTime: Date;
    isUrgent: boolean;
    isBooked: boolean;
}

export interface Day {
    date: Date;
    slots: Slot[];
}
