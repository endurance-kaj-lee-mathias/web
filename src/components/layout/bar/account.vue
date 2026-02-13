<script lang="ts" setup>
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();

function matches(): boolean {
    return route.path === "/account" || route.path.startsWith("/account");
}
</script>

<template>
    <RouterLink
        to="/account"
        :class="`px-3 py-1.5 flex flex-col transition-colors cursor-pointer select-none rounded-lg  ${matches() ? 'bg-gray-200' : 'hover:bg-gray-200'}`"
    >
        <h2 class="font-bold">Account</h2>
        <p className="text-gray-500 dark:text-neutral-400">Your smart home</p>
    </RouterLink>
</template>
