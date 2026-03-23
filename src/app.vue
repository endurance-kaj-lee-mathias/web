<script setup lang="ts">
import { RouterView } from "vue-router";
import Loading from "@/features/loading/loading.vue";
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
    <Loading />
    <RouterView />
    <Toaster :closeButton="true" closeButtonPosition="top-right" />
</template>
