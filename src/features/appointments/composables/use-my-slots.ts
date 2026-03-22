import type { Slot } from "@/features/appointments/models/slot/slot";
import { getAll } from "@/features/appointments/services/slots";
import { ref } from "vue";

export function useMySlots() {
    const slots = ref(null as Slot[] | null);
    const loading = ref(false);
    const error = ref<Error | null>(null);

    async function fetch(date: Date, initial?: boolean) {
        try {
            if (initial) loading.value = true;
            slots.value = await getAll(date);
            error.value = null;
        } catch (err) {
            if (!(err instanceof Error)) return;
            error.value = err as Error;
        } finally {
            if (!initial) return;
            loading.value = false;
        }
    }

    return { slots, loading, error, fetch };
}
