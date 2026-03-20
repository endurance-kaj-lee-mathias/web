<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";

const props = defineProps<{ href: string; active?: boolean }>();
const route = useRoute();

function matches(): boolean {
    return props.href === route.path;
}
</script>

<template>
    <RouterLink
        :to="href"
        :class="`text-lg cursor-pointer text-center font-semibold transition-colors duration-100 px-3 py-0.5 rounded-lg min-w-32 ${matches() || active ? 'bg-accent text-light' : 'text-medium hover:bg-accent hover:text-light'}`"
    >
        <slot />
    </RouterLink>
</template>
