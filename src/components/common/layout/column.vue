<script setup lang="ts">
import { Gap } from "@/components/common/layout/gap";

defineProps<{ gap?: Gap }>();
</script>

<template>
    <section :class="`flex flex-col ${gap ?? Gap.MEDIUM}`">
        <slot />
    </section>
</template>
