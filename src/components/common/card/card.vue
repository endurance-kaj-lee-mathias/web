<script setup lang="ts">
import Overlay from "@/components/common/card/overlay.vue";
import Row from "@/components/common/layout/row.vue";
import { Align } from "@/components/common/layout/align";
import { Justify } from "@/components/common/layout/justify";
import { Gap } from "@/components/common/layout/gap";

const props = defineProps<{
    image: string;
    title: string;
    action?: string | (() => void);
    footer?: boolean;
    options?: boolean;
}>();

const actionStyles = props.action ? "group cursor-pointer select-none" : "";
</script>

<template>
    <article
        :class="`flex flex-col bg-cover bg-center ${actionStyles} relative overflow-hidden justify-end px-4 py-2 rounded-lg h-36`"
        :style="`background-image: url('${image}')`"
    >
        <Overlay v-if="image" />

        <section class="relative z-10 text-light-2">
            <section class="min-w-0">
                <section class="flex flex-col -space-y-0.5">
                    <h3 class="font-bold text-lg truncate">
                        {{ title }}
                    </h3>

                    <section
                        v-if="footer"
                        :class="`flex flex-row ${Gap.MEDIUM} min-w-0`"
                    >
                        <slot name="footer" />
                    </section>
                </section>
            </section>
        </section>
    </article>
</template>
