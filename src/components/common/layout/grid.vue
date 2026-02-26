<script setup lang="ts">
import { Gap } from "@/components/common/layout/gap";
import { Size } from "@/components/common/layout/grid";

defineProps<{
    gap?: Gap;
    size?: Size;
}>();
</script>

<template>
    <section :class="`grid ${gap ?? Gap.MEDIUM} ${size ?? Size.MEDIUM}`">
        <slot />
    </section>
</template>
