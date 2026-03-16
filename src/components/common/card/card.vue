<script setup lang="ts">
import Inner from "@/components/common/card/inner.vue";
import { Height } from "@/components/common/layout/height";

const props = defineProps<{
    image: string;
    title: string;
    action?: string | (() => void);
    footer?: boolean;
    options?: boolean;
    height?: Height;
}>();

const actionStyles = props.action ? "group cursor-pointer select-none" : "";
</script>

<template>
    <a
        v-if="typeof action === 'string' && action.startsWith('http')"
        :href="action"
        target="_blank"
    >
        <Inner v-bind="props" :action-styles="actionStyles">
            <slot /><template #options><slot name="options" /></template>
            <template #footer><slot name="footer" /></template>
        </Inner>
    </a>

    <RouterLink v-else-if="typeof action === 'string'" :to="action">
        <Inner v-bind="props" :action-styles="actionStyles">
            <slot />
            <template #options><slot name="options" /></template>
            <template #footer><slot name="footer" /></template>
        </Inner>
    </RouterLink>

    <div v-else-if="typeof action === 'function'" @click="action">
        <Inner v-bind="props" :action-styles="actionStyles">
            <slot />
            <template #options><slot name="options" /></template>
            <template #footer><slot name="footer" /></template>
        </Inner>
    </div>

    <Inner v-else v-bind="props">
        <slot />
        <template #options><slot name="options" /></template>
        <template #footer><slot name="footer" /></template>
    </Inner>
</template>
