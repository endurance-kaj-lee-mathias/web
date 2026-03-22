import { onMounted, ref, onUnmounted } from "vue";
import { createClient } from "@/lib/socket";
import { toast } from "vue-sonner";
import type { Notification } from "@/features/notifications/models/notifications";

export function useNotifications() {
    const notifications = ref<Notification[] | null>(null);
    const loading = ref(false);
    const error = ref<Error | null>(null);

    const socket = ref<Awaited<ReturnType<typeof createClient>> | null>(null);
    let unsubscribe: (() => void) | null = null;

    function handleIncoming(payload: unknown) {
        const incoming = payload as Notification;

        toast(incoming.content);

        if (!notifications.value) {
            notifications.value = [incoming];
            return;
        }

        notifications.value = [...notifications.value, incoming];
    }

    onMounted(async () => {
        try {
            toast("test");
            socket.value = await createClient("ws/notifications");
            unsubscribe = socket.value.onMessage(handleIncoming);
        } catch (err) {
            if (err instanceof Error) error.value = err;
        }
    });

    onUnmounted(() => {
        unsubscribe?.();
        socket.value?.close();
    });

    return { notifications, loading, error };
}
