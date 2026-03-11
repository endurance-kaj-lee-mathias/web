<script lang="ts" setup>
import { RouterLink } from "vue-router";

defineProps<{ action: string | (() => void) }>();
</script>

<template>
    <a
        v-if="typeof action === 'string' && action.startsWith('http')"
        :href="action"
        class="text-medium-2 hover:text-medium underline transition-colors duration-75 cursor-pointer"
        target="_blank"
    >
        <slot />
    </a>

    <router-link
        v-else-if="typeof action === 'string' && !action.startsWith('http')"
        class="text-medium-2 hover:text-medium underline decoration-wavy transition-colors duration-75 cursor-pointer"
        :to="action"
    >
        <slot />
    </router-link>

    <span
        v-else-if="typeof action === 'function'"
        @click="action"
        class="text-medium-2 hover:text-medium underline decoration-wavy transition-colors duration-75 cursor-pointer"
    >
        <slot />
    </span>
</template>
