import type { Conversation } from "@/features/chat/models/conversation/conversation";
import { getAll } from "@/features/chat/services/conversations";
import { ref } from "vue";

export function useConversations() {
    const conversations = ref(null as Conversation[] | null);
    const loading = ref(false);
    const error = ref<Error | null>(null);

    async function fetch() {
        try {
            loading.value = true;
            conversations.value = await getAll();
            error.value = null;
        } catch (err) {
            if (!(err instanceof Error)) return;
            error.value = err as Error;
        } finally {
            loading.value = false;
        }
    }

    fetch();
    return { conversations, loading, error };
}
