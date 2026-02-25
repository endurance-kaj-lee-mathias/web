<script setup lang="ts">
defineProps<{ src: string }>();
</script>

<template>
    <section
        class="bg-cover w-26 h-26 rounded-lg"
        :style="`background-image: url('${src}');`"
    />
</template>
