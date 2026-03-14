import type { ConversationId } from "@/features/messages/models/conversation-id";
import type { UserId } from "@/features/messages/models/user_id";

export interface Conversation {
    id: ConversationId;
    otherUserId: UserId;
    firstName: string;
    lastName: string;
    imageUrl: string;
    latestMessage?: string;
    latestMessageSentBy?: UserId;
    latestMessageAt?: Date;
}
