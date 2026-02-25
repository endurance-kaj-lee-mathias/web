<script setup lang="ts">
import { Gap } from "@/components/common/layout/gap";
import { Align } from "@/components/common/layout/align";
import { Justify } from "@/components/common/layout/justify";
import { Padding } from "@/components/common/layout/padding";

defineProps<{
    gap?: Gap;
    align?: Align;
    justify?: Justify;
    padding?: Padding;
}>();
</script>

<template>
    <section
        :class="`flex flex-col ${gap ?? Gap.MEDIUM} ${align ?? Align.STRETCH} ${justify ?? Justify.START} ${padding ?? Padding.NONE}`"
    >
        <slot />
    </section>
</template>
