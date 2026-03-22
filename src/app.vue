<script setup lang="ts">
import { RouterView } from "vue-router";
import { Toaster, toast } from "vue-sonner";
import "vue-sonner/style.css";
import { useProfile } from "@/stores/profile";
import { watch } from "vue";
import { useKeycloak } from "@josempgon/vue-keycloak";
import { useNotifications } from "@/features/notifications/composables/use-notifications";

const store = useProfile();
const keycloak = useKeycloak();
useNotifications();

watch(
    () => keycloak.isAuthenticated,
    async (authenticated) => {
        if (authenticated) return;
        await store.fetch();
    },
    { immediate: true },
);
</script>

<template>
    <RouterView />
    <Toaster
        :toastOptions="{
            unstyled: true,
            class: 'shadow-sm rounded-lg bg-light-2 min-w-32 p-4',
        }"
    />
</template>
