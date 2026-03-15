import type { MessageId } from "@/features/messages/models/message/id";
import type { ConversationId } from "@/features/messages/models/conversation/id";
import type { UserId } from "@/features/messages/models/user-id";

export interface Message {
    id: MessageId;
    conversationId: ConversationId;
    senderId: UserId;
    username: string;
    content: string;
    createdAt: Date;
}
