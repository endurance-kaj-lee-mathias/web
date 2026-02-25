<script setup lang="ts">
import {
    DialogClose,
    DialogContent,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
    DialogDescription,
    type DialogContentEmits,
    type DialogContentProps,
    useEmitAsProps,
} from "radix-vue";

import CloseIcon from "@/components/icons/close.vue";
import Column from "@/components/common/layout/column.vue";
import Row from "@/components/common/layout/row.vue";
import { Align } from "@/components/common/layout/align";
import { Justify } from "@/components/common/layout/justify";
import Small from "@/components/common/buttons/small.vue";
import type { Component } from "vue";

interface Props extends DialogContentProps {
    title: string;
    description: string;
    header?: Component;
    footer?: Component;
}

const props = defineProps<Props>();
const emits = defineEmits<DialogContentEmits>();

const emitsAsProps = useEmitAsProps(emits);
</script>

<template>
    <DialogPortal>
        <DialogOverlay class="fixed inset-0 bg-black/50 z-100" />

        <DialogContent
            v-bind="{ ...props, ...emitsAsProps }"
            class="flex flex-col fixed z-100 left-1/2 top-1/2 xs:w-[75%] w-[90%] max-w-2xl h-[90%] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-light text-fg overflow-hidden"
        >
            <section
                className="sticky top-0 bg-light py-3 px-4 border-b-2 border-medium-3 z-10"
            >
                <Column>
                    <Row
                        :justify="Justify.BETWEEN"
                        :align="Align.CENTER"
                        :responsive="false"
                    >
                        <DialogTitle className="text-xl font-semibold truncate">
                            {{ title }}
                        </DialogTitle>

                        <DialogClose>
                            <Small>
                                <CloseIcon />
                            </Small>
                        </DialogClose>
                    </Row>

                    <component v-if="header" :as="header" />
                </Column>
            </section>

            <section class="flex-1 overflow-y-auto px-6 py-4">
                <slot />
            </section>

            <section
                v-if="footer"
                class="sticky bottom-0 bg-bg py-4 px-6 border-t-2 border-bg-2 z-10"
            >
                <component :as="footer" />
            </section>
        </DialogContent>
    </DialogPortal>
</template>
