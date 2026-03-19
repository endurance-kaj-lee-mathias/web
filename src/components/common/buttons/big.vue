<script setup lang="ts">
import { Height } from "@/components/common/layout/height";

const props = defineProps<{
    action?: string | (() => void);
    height?: Height;
}>();

const styles = `flex flex-col ${props.height ?? Height.MEDIUM} bg-light-2 hover:bg-accent text-medium hover:text-light-2 transition-colors duration-75 shadow-sm items-center justify-center p-2 rounded-lg`;
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
        v-else-if="typeof action === 'string'"
        :to="action"
        :class="styles"
    >
        <slot />
    </RouterLink>

    <div
        v-else-if="typeof action === 'function'"
        @click="action"
        :class="styles"
    >
        <slot />
    </div>
</template>
