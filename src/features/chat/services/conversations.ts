import { Env } from "@/lib/env";
import { client } from "@/lib/auth/client";
import type { Conversation } from "@/features/chat/models/conversation/conversation";
import type { UserId } from "@/features/chat/models/user-id";

const api = client(Env.apiUrl);

export async function getAll(): Promise<Conversation[]> {
    try {
        const { data } = await api.get<Conversation[]>("/chats");
        return data;
    } catch {
        throw new Error("Conversations could not be fetched");
    }
}

export async function start(id: UserId): Promise<void> {
    try {
        await api.post("/chats", { participantId: id });
    } catch {
        throw new Error("Conversation could not be started");
    }
}
