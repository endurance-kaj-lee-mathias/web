import { usePolling } from "@/composables/use-polling";
import { getAll } from "@/features/bookings/services/slots";
import type { ConnectionId } from "@/features/network/models/id";
import { POLLING_RATE } from "@/lib/polling";
import { ref } from "vue";
import type { Slot } from "@/features/bookings/models/slot/slot";

export function useSlots(id: ConnectionId) {
    const slots = ref(null as Slot[] | null);
    const loading = ref(false);
    const error = ref<Error | null>(null);

    async function fetch(id: ConnectionId, initial?: boolean) {
        try {
            if (initial) loading.value = true;
            slots.value = await getAll(id);
            error.value = null;
        } catch (err) {
            if (!(err instanceof Error)) return;
            error.value = err as Error;
        } finally {
            if (!initial) return;
            loading.value = false;
        }
    }

    usePolling(() => fetch(id, false), POLLING_RATE);
    return { slots, loading, error, fetch };
}
