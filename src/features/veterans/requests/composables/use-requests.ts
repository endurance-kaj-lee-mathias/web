import { usePolling } from "@/composables/use-polling";
import { getAll } from "@/features/veterans/requests/services/requests";
import { POLLING_RATE } from "@/lib/polling";
import { ref } from "vue";
import type { Request } from "@/features/veterans/requests/models/request";

export function useRequests() {
    const requests = ref(null as Request[] | null);
    const loading = ref(false);
    const error = ref<unknown>(null);

    const fetch = async () => {
        try {
            loading.value = true;
            const data = await getAll();
            requests.value = data.incoming;
            error.value = null;
        } catch (err) {
            error.value = err;
        } finally {
            loading.value = false;
        }
    };

    usePolling(fetch, POLLING_RATE);
    return { requests, loading, error, fetch };
}
