import type { AppointmentId } from "@/features/bookings/models/id";
import type { Status } from "@/features/bookings/models/status";

export interface Appointment {
    id: AppointmentId;
    title: string;
    status: Status;
    date: Date;
}
