import type { Appointment } from "@/features/appointments/models/appointment/appointment";
import { client } from "@/lib/auth/client";
import { Env } from "@/lib/env";

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
