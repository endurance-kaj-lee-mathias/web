import { Env } from "@/lib/env";
import { client } from "@/lib/auth/client";
import type { Conversation } from "@/features/messages/models/conversation";

const api = client(Env.apiUrl);

export async function getAll(): Promise<Conversation[]> {
    try {
        const { data } = await api.get<Conversation[]>("/chats");
        return data;
    } catch {
        throw new Error("Conversations could not be fetched");
    }
}
