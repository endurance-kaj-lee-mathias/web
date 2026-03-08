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
        :class="`text-lg cursor-pointer text-center font-semibold transition-colors
        duration-100 px-3 py-0.5 rounded-lg min-w-32 ${matches() ? 'bg-accent text-light' : 'bg-medium-3 text-medium hover:bg-accent hover:text-light'}`"
    >
        <p>{{ title }}</p>
    </RouterLink>
</template>
