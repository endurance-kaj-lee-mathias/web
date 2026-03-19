import type { AppointmentId } from "@/features/appointments/models/appointment/id";
import type { Status } from "@/features/appointments/models/appointment/status";
import type { SlotId } from "@/features/appointments/models/slot/id";

export interface Appointment {
    id: AppointmentId;
    slotId: SlotId;
    title: string;
    providerFirstName: string;
    providerLastName: string;
    providerUsername: string;
    providerImage: string;
    status: Status;
    startTime: Date;
    endTime: Date;
    isUrgent: boolean;
}
