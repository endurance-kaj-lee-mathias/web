import { getAll } from "@/features/veterans/veterans/services/rules";
import { ref } from "vue";
import {
    Effect,
    Resource,
    type Rule,
} from "@/features/veterans/veterans/models/rule";
import type { VeteranId } from "@/features/veterans/models/id";

type PartialRule = Omit<Rule, "id"> & { id?: Rule["id"] };

export function useRules(id: VeteranId) {
    const rules = ref<PartialRule[]>(
        Object.values(Resource).map((resource) => ({
            resource,
            effect: Effect.DENY,
        })),
    );
    const loading = ref(false);
    const error = ref<Error | null>(null);

    async function fetch() {
        loading.value = true;
        try {
            const fetchedRules = await getAll(id);

            rules.value = Object.values(Resource).map((resource) => {
                const match = fetchedRules.find((r) => r.resource === resource);
                return match ?? { resource, effect: Effect.DENY };
            });

            error.value = null;
        } catch (err) {
            if (!(err instanceof Error)) return;
            error.value = err;
        } finally {
            loading.value = false;
        }
    }

    return { rules, loading, error, fetch };
}
