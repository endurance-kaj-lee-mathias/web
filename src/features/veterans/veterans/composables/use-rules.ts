import { getAll } from "@/features/veterans/veterans/services/rules";
import { ref } from "vue";
import type { Rule } from "../models/rule";
import type { VeteranId } from "../../models/id";

export function useRules(id: VeteranId) {
    const rules = ref(null as Rule[] | null);
    const loading = ref(false);
    const error = ref<Error | null>(null);

    async function fetch() {
        try {
            rules.value = await getAll(id);
            error.value = null;
        } catch (err) {
            if (!(err instanceof Error)) return;
            error.value = err as Error;
        } finally {
            loading.value = false;
        }
    }

    return { rules, loading, error, fetch };
}
