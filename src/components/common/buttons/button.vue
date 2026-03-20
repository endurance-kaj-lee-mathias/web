<script setup lang="ts">
import { Style } from "@/components/common/buttons/style";
import { Gap } from "@/components/common/layout/gap";

const props = defineProps<{
    action?: string | (() => void);
    disabled?: boolean;
    full?: boolean;
    style?: Style;
}>();

const styles = `flex flex-row ${Gap.MEDIUM} h-9 items-center justify-center rounded-lg px-4 py-2 ${props.style ?? Style.DEFAULT} font-semibold ${props.disabled ? "cursor-not-allowed" : "transition-colors duration-100 cursor-pointer"} ${props.full ? "w-full" : ""}`;
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
        :disabled="disabled ?? false"
    >
        <slot />
    </button>

    <button v-else :class="styles" :disabled="disabled ?? false">
        <slot />
    </button>
</template>
