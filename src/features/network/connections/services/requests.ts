import { client } from "@/lib/auth/client";
import { Env } from "@/lib/env";
import type { RequestId } from "@/features/network/requests/models/id";

const api = client(Env.apiUrl);

export async function add(username: string, note: string): Promise<void> {
    try {
        await api.post("/support", { username, note });
    } catch {
        throw new Error("Request could not be sent");
    }
}

export async function accept(id: RequestId): Promise<void> {
    try {
        await api.patch(`/support/${id}/accept`);
    } catch {
        throw new Error("Request could not be accepted");
    }
}

export async function decline(id: RequestId): Promise<void> {
    try {
        await api.patch(`/support/${id}/decline`);
    } catch {
        throw new Error("Request could not be declined");
    }
}
