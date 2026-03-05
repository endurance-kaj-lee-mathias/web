<script setup lang="ts">
defineProps<{ disabled?: boolean; full?: boolean }>();
</script>

<template>
    <button
        :class="`flex flex-col h-9 items-center justify-center rounded-lg  px-4  py-2 bg-accent text-light-2 font-semibold hover:bg-accent-2 ${disabled ? 'cursor-not-allowed' : 'transition-colors cursor-pointer'} ${full ? 'w-full' : ''}`"
        :disabled="disabled ?? false"
    >
        <slot />
    </button>
</template>
