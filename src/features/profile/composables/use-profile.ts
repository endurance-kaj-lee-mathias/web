import type { Profile } from "@/features/profile/models/profile";
import { getOrCreate } from "@/features/profile/services/profile";
import { ref } from "vue";

export function useProfile() {
    const profile = ref(null as Profile | null);
    const loading = ref(true);
    const error = ref<Error | null>(null);

    async function fetch() {
        try {
            loading.value = true;
            profile.value = await getOrCreate();
            error.value = null;
        } catch (err) {
            if (!(err instanceof Error)) return;
            error.value = err as Error;
        } finally {
            loading.value = false;
        }
    }

    return { profile, loading, error, fetch };
}
