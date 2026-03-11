<script lang="ts" setup>
defineProps<{ click?: () => void; alternative?: boolean }>();
</script>

<template>
    <button
        :class="`flex items-center justify-center font-bold hover:bg-light-2 p-2 transition-colors rounded-lg cursor-pointer ${alternative ? 'text-light' : 'text-medium'} hover:text-accent duration-75`"
        @click="click"
    >
        <slot />
    </button>
</template>
