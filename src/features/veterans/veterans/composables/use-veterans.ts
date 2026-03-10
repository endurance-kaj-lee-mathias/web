import { usePolling } from "@/composables/use-polling";
import type { Veteran } from "@/features/veterans/veterans/models/veteran";
import { getAll } from "@/features/veterans/veterans/services/veterans";
import { POLLING_RATE } from "@/lib/polling";
import { ref } from "vue";

export function useVeterans() {
    const veterans = ref(null as Veteran[] | null);
    const loading = ref(false);
    const error = ref<Error | null>(null);

    async function fetch() {
        try {
            loading.value = true;
            veterans.value = await getAll();
            error.value = null;
        } catch (err) {
            if (!(err instanceof Error)) return;
            error.value = err as Error;
        } finally {
            loading.value = false;
        }
    }

    usePolling(fetch, POLLING_RATE);
    return { veterans, loading, error };
}
