<script setup lang="ts">
import { Align } from "@/components/common/layout/align";
import { Justify } from "@/components/common/layout/justify";
import { Padding } from "@/components/common/layout/padding";
import Column from "@/components/common/layout/column.vue";
import { Gap } from "@/components/common/layout/gap";

defineProps<{
    align?: Align;
    justify?: Justify;
    padding?: Padding;
}>();
</script>

<template>
    <Column
        :align="align"
        :justify="justify"
        :padding="padding"
        :gap="Gap.NONE"
    >
        <slot />
    </Column>
</template>
