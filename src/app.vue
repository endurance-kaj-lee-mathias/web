<script setup lang="ts">
import { RouterView } from "vue-router";
import { Toaster } from "vue-sonner";
import { useProfile } from "@/stores/profile";

import { watch } from "vue";
import { useKeycloak } from "@josempgon/vue-keycloak";

const store = useProfile();
const keycloak = useKeycloak();

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
    <Toaster />
</template>
