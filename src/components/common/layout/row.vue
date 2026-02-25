<script setup lang="ts">
import { Gap } from "@/components/common/layout/gap";
import { Align } from "@/components/common/layout/align";
import { Justify } from "@/components/common/layout/justify";

defineProps<{
    gap?: Gap;
    align?: Align;
    justify?: Justify;
    wrap?: boolean;
    responsive?: boolean;
}>();
</script>

<template>
    <section
        :class="`flex ${wrap ? 'flex-wrap' : ''} ${responsive ? 'flex-col md:flex-row' : 'flex-row'} ${gap ?? Gap.MEDIUM} ${align ?? Align.STRETCH} ${justify ?? Justify.START}`"
    >
        <slot />
    </section>
</template>
