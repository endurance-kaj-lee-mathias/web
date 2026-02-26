<script setup lang="ts">
defineProps<{ title: string; active: boolean; navigate: () => void }>();
</script>

<template>
    <button
        @click="navigate"
        :class="`text-lg cursor-pointer font-semibold transition-colors
        duration-75 px-3 py-0.5 rounded-lg min-w-32 ${active ? 'bg-medium-3' : 'hover:bg-light-2'}`"
    >
        <p>{{ title }}</p>
    </button>
</template>
