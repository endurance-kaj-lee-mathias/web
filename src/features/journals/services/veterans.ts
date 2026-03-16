import type { Veteran } from "@/features/journals/models/veteran/veteran";
import { client } from "@/lib/auth/client";
import { Env } from "@/lib/env";

const api = client(Env.apiUrl);

export async function getAll(): Promise<Veteran[]> {
    try {
        const { data } = await api.get<Veteran[]>("/users/me/support");
        return data;
    } catch {
        throw new Error("Veterans could not be fetched");
    }
}
