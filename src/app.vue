<script setup lang="ts">
import { RouterView } from "vue-router";
import Loading from "@/features/loading.vue";
import { ref } from "vue";
import { Toaster } from "vue-sonner";
import "vue-sonner/style.css";
import { useProfile } from "@/stores/profile";
import { watch } from "vue";
import { useKeycloak } from "@josempgon/vue-keycloak";
import { useNotifications } from "@/features/notifications/composables/use-notifications";

const store = useProfile();
const keycloak = useKeycloak();
useNotifications();
const shown = ref(!!localStorage.getItem("LOADING_SHOWN"));

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
    <Loading v-if="!shown" />
    <RouterView />
    <Toaster :closeButton="true" closeButtonPosition="top-right" />
</template>
