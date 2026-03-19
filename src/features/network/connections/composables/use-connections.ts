import { usePolling } from "@/composables/use-polling";
import type { Connection } from "@/features/network/connections/models/connection";
import { getAll } from "@/features/network/connections/services/connections";
import { POLLING_RATE } from "@/lib/polling";
import { ref } from "vue";

export function useConnections() {
    const connections = ref(null as Connection[] | null);
    const loading = ref(false);
    const error = ref<Error | null>(null);

    async function fetch(initial = false) {
        try {
            if (initial) loading.value = true;
            connections.value = await getAll();
            error.value = null;
        } catch (err) {
            if (!(err instanceof Error)) return;
            error.value = err as Error;
        } finally {
            if (!initial) return;
            loading.value = false;
        }
    }

    usePolling(fetch, POLLING_RATE);
    return { connections, loading, error, fetch };
}
