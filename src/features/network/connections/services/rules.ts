import { client } from "@/lib/auth/client";
import { Env } from "@/lib/env";
import type {
    Effect,
    Resource,
    Rule,
} from "@/features/network/connections/models/rule";
import type { VeteranId } from "@/features/network/models/id";

const api = client(Env.apiUrl);

export async function getAll(id: VeteranId): Promise<Rule[]> {
    try {
        const { data } = await api.get<Rule[]>(`/sharing/rules/${id}`);
        return data;
    } catch {
        throw new Error("Rules could not be fetched");
    }
}

export async function save(
    id: VeteranId,
    resource: Resource,
    effect: Effect,
): Promise<void> {
    try {
        await api.post("/sharing/rules", { viewerId: id, resource, effect });
    } catch {
        throw new Error("Rule could not be saved");
    }
}
