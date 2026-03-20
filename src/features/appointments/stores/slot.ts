import { Stores } from "@/stores/stores";
import { defineStore } from "pinia";
import { ref } from "vue";
import type { Slot } from "@/features/appointments/models/slot/slot";

export const useSlot = defineStore(Stores.SLOT, () => {
    const selected = ref<Slot | null>(null);

    function select(slot: Slot) {
        selected.value = slot;
    }

    return { selected, select };
});
