import type { ConversationId } from "@/features/chat/models/conversation/id";
import type { UserId } from "@/features/chat/models/user-id";

export interface Conversation {
    id: ConversationId;
    otherUserId: UserId;
    firstName: string;
    lastName: string;
    username: string;
    image: string;
}
