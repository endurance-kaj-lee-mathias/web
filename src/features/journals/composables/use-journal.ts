import { usePolling } from "@/composables/use-polling";
import { get } from "@/features/journals/services/veterans";
import { POLLING_RATE } from "@/lib/polling";
import { ref } from "vue";
import type { Journal } from "@/features/journals/models/journal/journal";

export function useJournal(username: string) {
    const journal = ref(null as Journal | null);
    const loading = ref(false);
    const error = ref<Error | null>(null);

    async function fetch(initial = false) {
        try {
            if (initial) loading.value = true;
            journal.value = await get(username);
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
    return {
        journal,
        stress: journal.value?.stressScores,
        mood: journal.value?.moodEntries,
        loading,
        error,
        fetch,
    };
}
