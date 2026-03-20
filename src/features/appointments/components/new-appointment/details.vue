<script lang="ts" setup>
import Column from "@/components/common/layout/column.vue";
import { ref } from "vue";
import Input from "@/components/common/inputs/input.vue";
import Select from "@/components/common/inputs/select.vue";
import { useSlot } from "@/features/appointments/stores/slot";
import { useTemplateRef } from "vue";
import Boundary from "@/components/common/states/boundary.vue";
import { send as sendAppointment } from "@/features/appointments/services/slots";

const store = useSlot();
const title = ref("");
const urgent = ref("false");

const boundary = useTemplateRef<InstanceType<typeof Boundary>>("boundary");
defineExpose({ send });
const emit = defineEmits(["sent"]);

async function send() {
    if (!store.selected) return;

    try {
        await sendAppointment(
            store.selected.id,
            title.value,
            store.selected.isUrgent,
        );
        boundary.value!.error = null;
        emit("sent");
    } catch (error: unknown) {
        boundary.value!.error = error as Error;
    }
}
</script>

<template>
    <Boundary ref="boundary">
        <Column>
            <Input label="Title" placeholder="Coffee Break" v-model="title" />
            <Select label="Urgency" :disabled="true">
                {{ store.selected?.isUrgent ? "Urgent" : "Not Urgent" }}
            </Select>
        </Column>
    </Boundary>
</template>
