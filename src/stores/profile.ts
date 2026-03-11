import { useProfile as useProfileComposable } from "@/features/profile/composables/use-profile";
import { Stores } from "@/stores/stores";
import { defineStore } from "pinia";

export const useProfile = defineStore(Stores.PROFILE, () => {
    const { profile, loading, error, fetch } = useProfileComposable();
    return { profile, loading, error, fetch };
});
