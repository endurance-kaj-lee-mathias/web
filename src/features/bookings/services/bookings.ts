import type { Appointment } from "@/features/bookings/models/appointment";
import { client } from "@/lib/auth/client";
import { Env } from "@/lib/env";

const api = client(Env.apiUrl);

export async function getAll(day: Date): Promise<Appointment[]> {
    try {
        const { data } = await api.get<Appointment[]>(
            `/calendar/slots/me/${day}`,
        );
        return data;
    } catch {
        throw new Error("Appointments could not be fetched");
    }
}
