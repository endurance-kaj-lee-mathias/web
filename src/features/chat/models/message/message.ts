import type { MessageId } from "@/features/chat/models/message/id";
import type { ConversationId } from "@/features/chat/models/conversation/id";
import type { UserId } from "@/features/chat/models/user-id";

export interface Message {
    id: MessageId;
    conversationId: ConversationId;
    senderId: UserId;
    username: string;
    content: string;
    createdAt: Date;
}
