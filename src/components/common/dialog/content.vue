<script setup lang="ts">
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
    useEmitAsProps,
    type DialogContentEmits,
    type DialogContentProps,
} from "radix-vue";

import Small from "@/components/common/buttons/small.vue";
import { Align } from "@/components/common/layout/align";
import Column from "@/components/common/layout/column.vue";
import { Justify } from "@/components/common/layout/justify";
import Row from "@/components/common/layout/row.vue";
import CloseIcon from "@/components/icons/close.vue";
import Stack from "@/components/common/layout/stack.vue";

interface Props extends DialogContentProps {
    title: string;
    description: string;
    header?: boolean;
    footer?: boolean;
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
                class="sticky top-0 bg-light py-3 px-4 border-b-2 border-medium-3 z-10"
            >
                <Column>
                    <Row
                        :justify="Justify.BETWEEN"
                        :align="Align.CENTER"
                        :responsive="false"
                    >
                        <section class="-space-y-1">
                            <DialogTitle
                                class="text-medium text-lg font-semibold truncate"
                            >
                                {{ title }}
                            </DialogTitle>

                            <DialogDescription class="text-medium-2 text-sm">
                                {{ description }}
                            </DialogDescription>
                        </section>

                        <DialogClose>
                            <Small>
                                <CloseIcon />
                            </Small>
                        </DialogClose>
                    </Row>

                    <slot name="header" />
                </Column>
            </section>

            <section class="flex-1 overflow-y-auto px-6 py-4">
                <Column>
                    <slot />
                </Column>
            </section>

            <section
                v-if="footer"
                class="sticky bottom-0 bg-bg py-4 px-6 border-t-2 border-medium-3 z-10"
            >
                <Column>
                    <slot name="footer" />
                </Column>
            </section>
        </DialogContent>
    </DialogPortal>
</template>
