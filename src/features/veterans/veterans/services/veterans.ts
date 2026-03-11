import type { Veteran } from "@/features/veterans/veterans/models/veteran";
import { client } from "@/lib/auth/client";
import { Env } from "@/lib/env";
import type { VeteranId } from "@/features/veterans/models/id";

const api = client(Env.apiUrl);

export async function getAll(): Promise<Veteran[]> {
    try {
        const { data } = await api.get<Veteran[]>("/users/support");
        return data;
    } catch {
        throw new Error("Veterans could not be fetched");
    }
}

export async function remove(id: VeteranId): Promise<void> {
    try {
        await api.delete(`/users/support/${id}`);
    } catch {
        throw new Error("Veteran could not be removed");
    }
}
