import { defineStore } from "pinia";
import { ref } from "vue";
import type { ConversationId } from "@/features/messages/models/conversation-id";
import { Stores } from "@/stores/stores";

export const useConversation = defineStore(
    Stores.CONVERSATION,
    () => {
        const selected = ref<ConversationId | null>(null);

        function select(id: ConversationId) {
            selected.value = id;
        }

        return { selected, select };
    },
    {
        persist: {
            afterHydrate: (ctx) => {
                const raw = ctx.store.selected;
                if (raw === null) return;
                ctx.store.selected = raw as ConversationId;
            },
        },
    },
);
