import { client } from "@/lib/auth/client";
import { Env } from "@/lib/env";
import type { Requests } from "@/features/veterans/requests/models/requests";

const api = client(Env.apiUrl);

export async function getAll(): Promise<Requests> {
    try {
        const { data } = await api.get<Requests>("/requests");
        return data;
    } catch {
        throw new Error("Requests could not be fetched");
    }
}
