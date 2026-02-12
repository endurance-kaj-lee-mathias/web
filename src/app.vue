<script setup lang="ts">
import { Toaster } from "vue-sonner";
import { useKeycloak } from "@josempgon/vue-keycloak";
import { RouterView } from "vue-router";

const keycloak = useKeycloak();
</script>

<template>
    Authenticated: {{ keycloak.isAuthenticated }}
    <RouterView />
    <Toaster />
</template>
