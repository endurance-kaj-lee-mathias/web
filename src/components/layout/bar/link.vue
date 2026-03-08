<script lang="ts" setup>
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();
defineProps<{ href: string }>();

function matches(path: string): boolean {
    return path === route.path || (path !== "/" && route.path.startsWith(path));
}
</script>

<template>
    <RouterLink
        :to="href"
        :class="`flex flex-row items-center gap-2 text-xl font-bold cursor-pointer ${matches(href) ? 'text-accent' : 'text-medium-2 hover:text-accent transition-colors duration-75'}`"
    >
        <slot />
    </RouterLink>
</template>
