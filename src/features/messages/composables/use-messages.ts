import type { Message } from "@/features/messages/models/message";
import { getAll } from "@/features/messages/services/messages";
import { ref } from "vue";
import type { ConversationId } from "@/features/messages/models/conversation-id";

export function useMessages(id: ConversationId) {
    const messages = ref(null as Message[] | null);
    const loading = ref(false);
    const error = ref<Error | null>(null);

    async function fetch() {
        try {
            loading.value = true;
            messages.value = await getAll(id);
            error.value = null;
        } catch (err) {
            if (!(err instanceof Error)) return;
            error.value = err as Error;
        } finally {
            loading.value = false;
        }
    }

    fetch();
    return { messages, loading, error };
}
