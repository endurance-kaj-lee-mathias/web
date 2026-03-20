import { usePolling } from "@/composables/use-polling";
import type { Day } from "@/features/appointments/models/slot/slot";
import { getAll } from "@/features/appointments/services/slots";
import { POLLING_RATE } from "@/lib/polling";
import { ref, watch } from "vue";

export function useMySlots(weeks: () => number) {
    const days = ref(null as Day[] | null);
    const loading = ref(false);
    const error = ref<Error | null>(null);

    async function fetch(weeks: number, initial?: boolean) {
        try {
            if (initial) loading.value = true;
            days.value = await getAll(weeks);
            error.value = null;
        } catch (err) {
            if (!(err instanceof Error)) return;
            error.value = err as Error;
        } finally {
            if (!initial) return;
            loading.value = false;
        }
    }

    usePolling(() => fetch(weeks()), POLLING_RATE);
    watch(weeks, () => fetch(weeks()));
    return { days, loading, error, fetch };
}
