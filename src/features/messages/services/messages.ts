import { Env } from "@/lib/env";
import { client } from "@/lib/auth/client";
import type { ConversationId } from "@/features/messages/models/conversation-id";
import type { Message } from "@/features/messages/models/message";

const api = client(Env.apiUrl);

export async function getAll(id: ConversationId): Promise<Message[]> {
    try {
        const { data } = await api.get<Message[]>(`/chats/${id}/messages`);
        return data;
    } catch {
        throw new Error("Messages could not be fetched");
    }
}
