<script setup lang="ts">
import { RouterView } from "vue-router";
import { Toaster } from "vue-sonner";
import { useProfile } from "./stores/profile";
import { onMounted } from "vue";

const store = useProfile();
onMounted(async () => store.fetch());
</script>

<template>
    <RouterView />
    <Toaster />
</template>
