<script lang="ts" setup>
import { RouterLink } from "vue-router";
import { Gap } from "@/components/common/layout/gap";
import { SmallStyle } from "@/components/common/buttons/style";

const props = defineProps<{
    action?: string | (() => void);
    disabled?: boolean;
    style?: SmallStyle;
}>();

const styles = `flex items-center ${Gap.MEDIUM} justify-center font-bold  p-2 transition-colors rounded-lg cursor-pointer duration-75 ${props.style ?? SmallStyle.DEFAULT}`;
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
        :disabled="disabled"
    >
        <slot />
    </button>

    <span v-else :class="styles">
        <slot />
    </span>
</template>
