<script setup lang="ts">
import { Gap } from "@/components/common/layout/gap";
import { Align } from "@/components/common/layout/align";
import { Justify } from "@/components/common/layout/justify";

defineProps<{ gap?: Gap; align?: Align; justify?: Justify; wrap?: boolean }>();
</script>

<template>
    <section
        :class="`flex flex-row ${wrap && 'flex-wrap'} ${gap ?? Gap.MEDIUM} ${align ?? Align.STRETCH} ${justify ?? Justify.START}`"
    >
        <slot />
    </section>
</template>
