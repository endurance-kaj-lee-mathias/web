<script lang="ts" setup>
import Small from "@/components/common/buttons/small.vue";
import { SmallStyle } from "@/components/common/buttons/style";
import Card from "@/components/common/card/card.vue";
import { Dialog, DialogContent } from "@/components/common/dialog/dialog";
import Column from "@/components/common/layout/column.vue";
import { Height } from "@/components/common/layout/height";
import Boundary from "@/components/common/states/boundary.vue";
import Empty from "@/components/common/states/empty.vue";
import Loading from "@/components/common/states/loading.vue";
import AddIcon from "@/components/icons/add.vue";
import { useSlots } from "@/features/bookings/composables/use-slots";
import type { ConnectionId } from "@/features/network/models/id";
import { ref } from "vue";
import { useTemplateRef, watchEffect } from "vue";
import { Page } from "@/features/bookings/components/new/page";
import Button from "@/components/common/buttons/button.vue";
import type { Slot } from "@/features/bookings/models/slot/slot";
import { watch } from "vue";
import { getDate, getTime } from "@/lib/date";
import Details from "@/features/bookings/components/new/details.vue";
import Available from "@/features/bookings/components/new/available.vue";
import Grid from "@/components/common/layout/grid.vue";
import { Size } from "@/components/common/layout/grid";

const props = defineProps<{
    modelValue: boolean;
    id: ConnectionId;
}>();

const emit = defineEmits(["update:modelValue"]);
const send = ref<InstanceType<typeof Details> | null>(null);
const page = ref(Page.SLOTS);

watch(
    () => props.modelValue,
    (value, old) => {
        if (!old || value) return;
        page.value = Page.SLOTS;
    },
);
</script>

<template>
    <Dialog
        :open="modelValue"
        @update:open="$emit('update:modelValue', $event)"
    >
        <DialogContent
            title="Slots"
            description="Available"
            :closeable="true"
            :footer="page === Page.SLOT"
        >
            <Available
                v-if="page === Page.SLOTS"
                :id="id"
                @selected="page = Page.SLOT"
            />

            <Details ref="send" v-else-if="page === Page.SLOT" />

            <template v-slot:footer v-if="page === Page.SLOT">
                <Grid :size="Size.SMALL">
                    <Button :action="() => (page = Page.SLOTS)">Back</Button>
                    <Button :action="() => send?.send()">Plan</Button>
                </Grid>
            </template>
        </DialogContent>
    </Dialog>
</template>
