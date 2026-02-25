import { Env } from "@/lib/env";
import type { Profile } from "@/features/profile/models/profile";
import { client } from "@/lib/auth/client";

const api = client(Env.apiUrl);

export async function getOrCreate(): Promise<Profile> {
    try {
        const { data } = await api.get<Profile>("/users");
        return data;
    } catch {
        throw new Error("Profile could not be fetched");
    }
}
