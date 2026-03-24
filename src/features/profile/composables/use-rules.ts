import { ref } from "vue";
import { Resource, type Rule } from "@/features/profile/models/rule";

export function useRules(fetchedRules: Rule[]) {
    const rules = ref<Rule[]>(
        Object.values(Resource).map((resource) => ({
            resource,
            isPrivate: true,
        })),
    );
    const loading = ref(false);
    const error = ref<Error | null>(null);

    async function fetch() {
        loading.value = true;
        try {
            rules.value = Object.values(Resource).map((resource) => {
                const match = fetchedRules.find((r) => r.resource === resource);
                return match ?? { resource, isPrivate: true };
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
