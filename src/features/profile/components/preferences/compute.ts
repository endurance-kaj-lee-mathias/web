import { computed, type WritableComputedRef } from "vue";

export function useComputedField<
    V extends Record<string, any>,
    K extends keyof V,
>(
    props: { values: V },
    emit: (e: "update:values", value: V) => void,
    key: K,
): WritableComputedRef<V[K]> {
    return computed({
        get(): V[K] {
            return props.values[key];
        },
        set(val: V[K]) {
            emit("update:values", {
                ...props.values,
                [key]: val,
            });
        },
    });
}
