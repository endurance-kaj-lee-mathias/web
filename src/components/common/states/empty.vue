<script setup lang="ts">
defineProps<{ message?: string }>();
</script>

<template>
    <p class="text-medium text-center my-4">
        {{ message ?? "There's nothing here yet!" }}
    </p>
</template>
