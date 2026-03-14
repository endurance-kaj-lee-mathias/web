// use-messages.ts
import type { Message } from "@/features/messages/models/message/message";
import { getAll } from "@/features/messages/services/messages";
import { ref, onUnmounted } from "vue";
import type { ConversationId } from "@/features/messages/models/conversation/id";
import { createClient } from "@/lib/socket";

export function useMessages(id: ConversationId) {
    const messages = ref<Message[] | null>(null);
    const loading = ref(false);
    const error = ref<Error | null>(null);

    const socket = createClient();

    async function fetch() {
        try {
            loading.value = true;
            messages.value = await getAll(id);
            error.value = null;
        } catch (err) {
            if (err instanceof Error) error.value = err;
        } finally {
            loading.value = false;
        }
    }

    const unsubscribe = socket.subscribe(`chat:${id}`, (payload) => {
        const incoming = payload as Message;
        if (!messages.value) return;
        messages.value = [...messages.value, incoming];
    });

    onUnmounted(() => {
        unsubscribe();
        socket.close();
    });

    fetch();
    return { messages, loading, error };
}
