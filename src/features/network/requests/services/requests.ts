import { client } from "@/lib/auth/client";
import { Env } from "@/lib/env";
import type { Requests } from "@/features/network/requests/models/requests";
import type { RequestId } from "@/features/network/requests/models/id";

const api = client(Env.apiUrl);

export async function getAll(): Promise<Requests> {
    try {
        const { data } = await api.get<Requests>("/support");
        return data;
    } catch {
        throw new Error("Requests could not be fetched");
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
