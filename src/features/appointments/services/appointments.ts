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

export async function download(): Promise<void> {
    try {
        const { data } = await api.get<Blob>("/calendar/me/export", {
            responseType: "blob",
        });

        const url = URL.createObjectURL(data);
        const a = document.createElement("a");
        a.href = url;
        a.download = "export.ics";
        a.click();

        URL.revokeObjectURL(url);
    } catch {
        throw new Error("Calendar could not be downloaded");
    }
}
