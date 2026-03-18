import type { Veteran } from "@/features/journals/models/veteran/veteran";
import { client } from "@/lib/auth/client";
import { Env } from "@/lib/env";
import type { Journal } from "@/features/journals/models/journal/journal";

const api = client(Env.apiUrl);

export async function getAll(): Promise<Veteran[]> {
    try {
        const { data } = await api.get<Veteran[]>("/users/me/support");
        return data;
    } catch {
        throw new Error("Veterans could not be fetched");
    }
}

export async function get(username: string, week: number): Promise<Journal> {
    try {
        const { data } = await api.get<Journal>(
            `/users/journal/${username.replace("@", "")}?week=${week}`,
        );
        return data;
    } catch {
        throw new Error("Journal could not be fetched");
    }
}
