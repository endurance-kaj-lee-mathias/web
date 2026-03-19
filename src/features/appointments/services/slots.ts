import type { SlotId } from "@/features/appointments/models/slot/id";
import type { Slot, Day } from "@/features/appointments/models/slot/slot";
import type { ConnectionId } from "@/features/network/models/id";
import { client } from "@/lib/auth/client";
import { Env } from "@/lib/env";

const api = client(Env.apiUrl);

export async function getAll(weeks: number): Promise<Day[]> {
    try {
        const { data } = await api.get<Slot[]>(
            `/calendar/slots?from=${getFormattedDate(getNextPage(weeks - 1))}&to=${getFormattedDate(getNextPage(weeks))}`,
        );

        const grouped = data.reduce<
            Record<string, { date: Date; slots: Slot[] }>
        >((acc, slot) => {
            const date = new Date(slot.startTime);
            const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

            if (acc[key]) {
                acc[key].slots.push(slot);
                return acc;
            }

            acc[key] = {
                date: new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate(),
                ),
                slots: [],
            };

            acc[key].slots.push(slot);
            return acc;
        }, {});

        return Object.values(grouped).sort(
            (a, b) => a.date.getTime() - b.date.getTime(),
        );
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
