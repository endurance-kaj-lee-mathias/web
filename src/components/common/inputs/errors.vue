<script setup lang="ts">
import Stack from '@/components/modular/layout/stack.vue';

defineProps({
    errors: Array<String>
});
</script>

<template>
    <Stack>
        <p v-for="error in errors">
            {{ error }}
        </p>
    </Stack>
</template>