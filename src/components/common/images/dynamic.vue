<script setup lang="ts">
defineProps<{ src: string }>();
</script>

<template>
    <section
        class="bg-cover bg-center md:w-26 w-full h-26 rounded-lg bg-accent"
        :style="`background-image: url('${src}');`"
    />
</template>
