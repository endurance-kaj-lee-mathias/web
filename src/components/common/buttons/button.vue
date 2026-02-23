<script setup lang="ts">
defineProps<{ disabled?: boolean }>();
</script>

<template>
    <button
        :class="`flex flex-col items-center justify-center rounded-lg  px-4  py-2 bg-accent text-light-2 font-semibold hover:bg-accent-2 ${disabled ? 'cursor-not-allowed' : 'transition-colors cursor-pointer'}`"
        :disabled="disabled ?? false"
    >
        <slot />
    </button>
</template>
