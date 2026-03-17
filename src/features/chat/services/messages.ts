import { Env } from "@/lib/env";
import { client } from "@/lib/auth/client";
import type { ConversationId } from "@/features/chat/models/conversation/id";
import type { Message } from "@/features/chat/models/message/message";

const api = client(Env.apiUrl);

export async function getAll(id: ConversationId): Promise<Message[]> {
    try {
        const { data } = await api.get<Message[]>(`/chats/${id}/messages`);
        return data;
    } catch {
        throw new Error("Messages could not be fetched");
    }
}

export async function send(id: ConversationId, message: string): Promise<void> {
    try {
        await api.post(`/chats/${id}/messages`, {
            content: message,
        });
    } catch {
        throw new Error("Message could not be sent");
    }
}
