<script lang="ts" setup>
import Column from "@/components/common/layout/column.vue";
import { ref } from "vue";
import Input from "@/components/common/inputs/input.vue";
import Select from "@/components/common/inputs/select.vue";
import { useSlot } from "@/features/bookings/stores/slot";
import { useTemplateRef } from "vue";
import Boundary from "@/components/common/states/boundary.vue";
import { send as sendAppointment } from "@/features/bookings/services/slots";

const store = useSlot();
const title = ref("");
const urgent = ref(false);

const boundary = useTemplateRef<InstanceType<typeof Boundary>>("boundary");
defineExpose({ send });

async function send() {
    if (!store.selected) return;

    try {
        await sendAppointment(store.selected.id, title.value, urgent.value);
        boundary.value!.error = null;
    } catch (error: unknown) {
        boundary.value!.error = error as Error;
    }
}
</script>

<template>
    <Boundary ref="boundary">
        <Column>
            <Input label="Title" placeholder="Coffee Break" v-model="title" />
            <Select label="Urgency" v-model="urgent">
                <option :value="false">Not Urgent</option>
                <option :value="true">Very Urgent</option>
            </Select>
        </Column>
    </Boundary>
</template>
