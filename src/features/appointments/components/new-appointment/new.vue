<script lang="ts" setup>
import Button from "@/components/common/buttons/button.vue";
import { Dialog, DialogContent } from "@/components/common/dialog/dialog";
import { Size } from "@/components/common/layout/grid";
import Grid from "@/components/common/layout/grid.vue";
import Available from "@/features/appointments/components/new-appointment/available.vue";
import Details from "@/features/appointments/components/new-appointment/details.vue";
import { Page } from "@/features/appointments/components/new-appointment/page";
import type { ConnectionId } from "@/features/network/models/id";
import { ref, watch } from "vue";
import Network from "@/features/appointments/components/new-appointment/network.vue";

const props = defineProps<{ modelValue: boolean }>();

const emit = defineEmits(["update:modelValue", "sent"]);
const send = ref<InstanceType<typeof Details> | null>(null);
const page = ref(Page.NETWORK);

const selected = ref(null as ConnectionId | null);

function select(id: ConnectionId) {
    selected.value = id;
    page.value = Page.SLOTS;
}

watch(
    () => props.modelValue,
    (value, old) => {
        if (!old || value) return;
        page.value = Page.NETWORK;
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
            :footer="page === Page.SLOTS || page === Page.SLOT"
        >
            <Network v-if="page === Page.NETWORK" :select="select" />

            <Available
                v-if="page === Page.SLOTS && selected"
                :id="selected"
                @selected="page = Page.SLOT"
            />

            <Details
                ref="send"
                v-else-if="page === Page.SLOT"
                @sent="$emit('sent')"
            />

            <template v-slot:footer v-if="page === Page.SLOTS">
                <Button :action="() => (page = Page.NETWORK)">Back</Button>
            </template>

            <template v-slot:footer v-if="page === Page.SLOT">
                <Grid :size="Size.SMALL">
                    <Button :action="() => (page = Page.SLOTS)">Back</Button>
                    <Button :action="() => send?.send()">Plan</Button>
                </Grid>
            </template>
        </DialogContent>
    </Dialog>
</template>
