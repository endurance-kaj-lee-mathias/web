import type { ConversationId } from "@/features/messages/models/conversation/id";
import type { UserId } from "@/features/messages/models/user-id";

export interface Conversation {
    conversationId: ConversationId;
    otherUserId: UserId;
    firstName: string;
    lastName: string;
    username: string;
    imageUrl: string;
}
