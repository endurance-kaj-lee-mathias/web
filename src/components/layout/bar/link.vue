<script lang="ts" setup>
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();
defineProps<{ href: string }>();

function matches(path: string): boolean {
    return path === route.path;
}
</script>

<template>
    <RouterLink
        :to="href"
        :class="`px-3 py-1.5 flex flex-row items-center gap-2.5 transition-colors cursor-pointer select-none rounded-lg ${matches(href) ? 'bg-gray-200' : 'hover:bg-gray-200'}`"
    >
        <slot />
    </RouterLink>
</template>
