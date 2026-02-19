<script lang="ts" setup>
import { Gap } from "@/components/common/layout/gap";
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
        :class="`px-3 py-2 font-semibold text-lg flex flex-row items-center ${Gap.MEDIUM} transition-colors duration-100 cursor-pointer select-none rounded-lg ${matches(href) ? 'bg-dark text-light' : 'text-medium-2 hover:bg-dark hover:text-light'}`"
    >
        <slot />
    </RouterLink>
</template>
