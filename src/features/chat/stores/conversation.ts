import type { ConversationId } from "@/features/chat/models/conversation/id";
import { Stores } from "@/stores/stores";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useConversation = defineStore(Stores.CONVERSATION, () => {
    const selected = ref<ConversationId | null>(null);

    function select(id: ConversationId) {
        selected.value = id;
    }

    return { selected, select };
});
