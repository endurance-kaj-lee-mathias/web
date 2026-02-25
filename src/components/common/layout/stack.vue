<script setup lang="ts">
import { Gap } from "@/components/common/layout/gap";
import { Align } from "@/components/common/layout/align";
import { Justify } from "@/components/common/layout/justify";
import { Padding } from "@/components/common/layout/padding";
import Column from "@/components/common/layout/column.vue";

defineProps<{
    align?: Align;
    justify?: Justify;
    padding?: Padding;
}>();
</script>

<template>
    <Column :align="align" :justify="justify" :padding="padding">
        <slot />
    </Column>
</template>
