<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";

const props = defineProps<{ title: string; href: string }>();
const route = useRoute();

function matches(): boolean {
    return props.href === route.path;
}
</script>

<template>
    <RouterLink
        :to="href"
        :class="`text-lg cursor-pointer font-semibold text-center transition-colors
        duration-75 px-3 py-0.5 rounded-lg min-w-32 ${matches() ? 'bg-accent text-light' : 'hover:bg-light-2 text-medium'}`"
    >
        <p>{{ title }}</p>
    </RouterLink>
</template>
