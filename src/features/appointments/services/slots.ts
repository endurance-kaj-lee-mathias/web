import type { SlotId } from "@/features/appointments/models/slot/id";
import type { Slot, Day } from "@/features/appointments/models/slot/slot";
import type { ConnectionId } from "@/features/network/models/id";
import { client } from "@/lib/auth/client";
import { Env } from "@/lib/env";

const api = client(Env.apiUrl);

export async function getAll(date: Date): Promise<Slot[]> {
    try {
        const from = new Date(date);
        from.setHours(0, 0, 0, 0);

        const to = new Date(date);
        to.setHours(23, 59, 59, 999);

        const { data } = await api.get<Slot[]>(
            `/calendar/slots/me?from=${from.toISOString()}&to=${to.toISOString()}`,
        );

        return data;
    } catch {
        throw new Error("Slots could not be fetched");
    }
}

export async function get(id: ConnectionId): Promise<Slot[]> {
    try {
        const { data } = await api.get<Slot[]>(
            `/calendar/slots/${id}?from=${getFormattedDate(new Date())}&to=${getFormattedDate(getNextMonth())}`,
        );
        return data.filter((slot: Slot) => !slot.isBooked);
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

export async function add(
    startTime: Date,
    endTime: Date,
    urgent: boolean,
    recurring: boolean,
) {
    try {
        await api.post("/calendar/slots", {
            startTime:
                startTime instanceof Date
                    ? startTime.toISOString()
                    : new Date(startTime).toISOString(),
            endTime:
                endTime instanceof Date
                    ? endTime.toISOString()
                    : new Date(endTime).toISOString(),
            isUrgent: urgent,
            isRecurring: recurring,
        });
    } catch {
        throw new Error("Slot could not be created");
    }
}

export async function remove(id: SlotId) {
    try {
        await api.delete(`/calendar/slots/${id}`);
    } catch {
        throw new Error("Slot could not be removed");
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

function getNextPage(pages: number) {
    const now = new Date();
    return new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 4 * pages,
    );
}
