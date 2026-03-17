<script lang="ts" setup>
import { RouterLink } from "vue-router";

defineProps<{ action: string | (() => void) }>();

const styles =
    "text-medium-2 font-semibold hover:text-medium underline decoration-dotted decoration-2 transition-colors duration-75 cursor-pointer";
</script>

<template>
    <a
        v-if="typeof action === 'string' && action.startsWith('http')"
        :href="action"
        :class="styles"
        target="_blank"
    >
        <slot />
    </a>

    <RouterLink
        v-else-if="typeof action === 'string' && !action.startsWith('http')"
        :class="styles"
        :to="action"
    >
        <slot />
    </RouterLink>

    <span
        v-else-if="typeof action === 'function'"
        @click="action"
        :class="styles"
    >
        <slot />
    </span>
</template>
