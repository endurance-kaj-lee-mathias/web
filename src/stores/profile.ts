import type { Profile } from "@/features/profile/models/profile";
import { getOrCreate } from "@/features/profile/services/profile";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useProfile = defineStore("profile", () => {
    const profile = ref<Profile | null>(null);

    async function fetch() {
        try {
            profile.value = await getOrCreate();
        } catch {
            throw new Error("Profile could not be fetched");
        }
    }

    return { profile, fetch };
});
