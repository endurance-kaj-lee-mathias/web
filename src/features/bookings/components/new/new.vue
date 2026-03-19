<script lang="ts" setup>
import { Dialog, DialogContent } from "@/components/common/dialog/dialog";
import { watch } from "vue";
import { ref } from "vue";
import { Page } from "@/features/bookings/components/new/page";
import Network from "./network.vue";
import type { ConnectionId } from "@/features/network/models/id";

const props = defineProps<{ modelValue: boolean; day: Date }>();
const page = ref(Page.NETWORK);

watch(
    () => props.modelValue,
    (value, old) => {
        if (!old || value) return;
    },
);
</script>

<template>
    <Dialog
        :open="modelValue"
        @update:open="$emit('update:modelValue', $event)"
    >
        <DialogContent
            :title="`New Appointment on ${new Date(day).toLocaleDateString(
                'en-GB',
                {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'numeric',
                },
            )}`"
            :description="
                page === Page.NETWORK ? 'Connections' : 'Available Slots'
            "
            :closeable="true"
        >
            <Network
                v-if="page === Page.NETWORK"
                :day="day"
                :select="
                    (id: ConnectionId) => {
                        console.log(id);
                    }
                "
            />
        </DialogContent>
    </Dialog>
</template>
