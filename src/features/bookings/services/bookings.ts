import type { Appointment } from "@/features/bookings/models/appointment/appointment";
import { client } from "@/lib/auth/client";
import { Env } from "@/lib/env";
import type { AppointmentId } from "@/features/bookings/models/appointment/id";

const api = client(Env.apiUrl);

export async function getAll(day: Date): Promise<Appointment[]> {
    try {
        const { data } = await api.get<Appointment[]>(
            `/calendar/appointments/me/${day.toISOString().split("T")[0]}`,
        );
        return data;
    } catch {
        throw new Error("Appointments could not be fetched");
    }
}

export async function get(id: AppointmentId): Promise<Appointment> {
    try {
        const { data } = await api.get<Appointment>(
            `/calendar/slots/${id}/details`,
        );
        return data;
    } catch {
        throw new Error("Appointment could not be fetched");
    }
}
