import type { Message } from "@/features/chat/models/message/message";
import { getAll } from "@/features/chat/services/messages";
import type { ConversationId } from "@/features/chat/models/conversation/id";
import { onMounted, ref, onUnmounted } from "vue";
import { createClient } from "@/lib/socket";

export function useMessages(id: ConversationId) {
    const messages = ref<Message[] | null>(null);
    const loading = ref(false);
    const error = ref<Error | null>(null);

    const socket = ref<Awaited<ReturnType<typeof createClient>> | null>(null);
    let unsubscribe: (() => void) | null = null;

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

    function handleIncoming(payload: unknown) {
        const incoming = payload as Message;

        if (!messages.value) {
            messages.value = [incoming];
            return;
        }

        messages.value = [...messages.value, incoming];
    }

    onMounted(async () => {
        try {
            await fetch();
            socket.value = await createClient(`ws/${id}`);
            unsubscribe = socket.value.onMessage(handleIncoming);
        } catch (err) {
            if (err instanceof Error) error.value = err;
        }
    });

    onUnmounted(() => {
        unsubscribe?.();
        socket.value?.close();
    });

    return { messages, loading, error };
}
