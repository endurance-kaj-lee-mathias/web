<script setup lang="ts">
defineProps<{ active: boolean }>();
</script>

<template>
    <button
        :class="`text-lg cursor-pointer text-center font-semibold transition-colors duration-100 px-3 py-0.5 rounded-lg min-w-32 ${active ? 'bg-accent text-light' : 'text-medium hover:bg-accent hover:text-light'}`"
    >
        <slot />
    </button>
</template>
