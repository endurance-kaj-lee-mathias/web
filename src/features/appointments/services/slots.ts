import type { Slot } from "@/features/appointments/models/slot/slot";
import { client } from "@/lib/auth/client";
import { Env } from "@/lib/env";
import type { ConnectionId } from "@/features/network/models/id";
import type { SlotId } from "@/features/appointments/models/slot/id";

const api = client(Env.apiUrl);

export async function getAll(id: ConnectionId): Promise<Slot[]> {
    try {
        const { data } = await api.get<Slot[]>(
            `/calendar/slots/${id}?from=${getFormattedDate(new Date())}&to=${getFormattedDate(getNextMonth())}`,
        );
        return data;
    } catch {
        throw new Error("Slots could not be fetched");
    }
}

export async function send(id: SlotId, title: string, urgent: boolean) {
    try {
        await api.post(`/calendar/slots/${id}/book`, {
            title,
            urgent,
        });
    } catch {
        throw new Error("Slot could not be booked");
    }
}

function getFormattedDate(date: Date) {
    return date.toISOString();
}

function getNextMonth() {
    const now = new Date();
    if (now.getMonth() == 11) return new Date(now.getFullYear() + 1, 0, 1);
    return new Date(now.getFullYear(), now.getMonth() + 1, 1);
}
