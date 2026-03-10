import { usePolling } from "@/composables/use-polling";
import type { Veteran } from "@/features/veterans/veterans/models/veteran";
import { getAll } from "@/features/veterans/veterans/services/veterans";
import { POLLING_RATE } from "@/lib/polling";
import { ref } from "vue";

export function useVeterans() {
    const veterans = ref(null as Veteran[] | null);
    const loading = ref(false);
    const error = ref<unknown>(null);

    const fetch = async () => {
        try {
            loading.value = true;
            veterans.value = await getAll();
            error.value = null;
        } catch (err) {
            error.value = err;
        } finally {
            loading.value = false;
        }
    };

    usePolling(fetch, POLLING_RATE);
    return { veterans, loading, error };
}
