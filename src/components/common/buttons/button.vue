<script setup lang="ts">
defineProps<{ disabled?: boolean; full?: boolean }>();
</script>

<template>
    <button
        :class="`flex flex-col h-9 items-center justify-center rounded-lg  px-4  py-2 bg-medium-3 text-medium hover:bg-accent hover:text-light font-semibold ${disabled ? 'cursor-not-allowed' : 'transition-colors duration-100 cursor-pointer'} ${full ? 'w-full' : ''}`"
        :disabled="disabled ?? false"
    >
        <slot />
    </button>
</template>
