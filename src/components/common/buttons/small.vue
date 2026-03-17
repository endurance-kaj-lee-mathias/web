<script lang="ts" setup>
import { RouterLink } from "vue-router";

const props = defineProps<{
    action?: string | (() => void);
    alternative?: boolean;
}>();

const styles = `flex items-center justify-center font-bold hover:bg-light-2 p-2 transition-colors rounded-lg cursor-pointer ${props.alternative ? "text-light" : "text-medium"} hover:text-accent duration-75`;
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

    <button
        v-else-if="typeof action === 'function'"
        :class="styles"
        @click="action"
    >
        <slot />
    </button>

    <span v-else :class="styles">
        <slot />
    </span>
</template>
