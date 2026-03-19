<script setup lang="ts">
import Overlay from "@/components/common/card/overlay.vue";
import Column from "@/components/common/layout/column.vue";
import { Gap } from "@/components/common/layout/gap";
import Row from "@/components/common/layout/row.vue";
import { Justify } from "@/components/common/layout/justify";
import { Align } from "@/components/common/layout/align";
import { Height } from "@/components/common/layout/height";

defineProps<{
    image: string;
    title: string;
    footer?: boolean;
    options?: boolean;
    height?: Height;
    actionStyles?: string;
}>();
</script>

<template>
    <Column :gap="Gap.SMALL">
        <article
            :class="`flex flex-col ${height ?? Height.MEDIUM} bg-cover bg-center bg-accent shadow-sm ${actionStyles ?? ''} relative overflow-hidden justify-end p-2 rounded-lg`"
            :style="`background-image: url('${image}')`"
        >
            <Overlay v-if="image" />
            <section class="relative z-10 text-light-2">
                <Row :justify="Justify.BETWEEN" :align="Align.END">
                    <section class="min-w-0 px-1">
                        <section class="flex flex-col -space-y-0.5">
                            <h3 class="font-bold text-lg truncate">
                                {{ title }}
                            </h3>
                            <slot />
                        </section>
                    </section>
                    <Row v-if="options">
                        <slot name="options" />
                    </Row>
                </Row>
            </section>
        </article>
        <section v-if="footer" :class="`flex flex-col ${Gap.MEDIUM} min-w-0`">
            <slot name="footer" />
        </section>
    </Column>
</template>
