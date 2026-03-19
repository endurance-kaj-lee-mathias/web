<script lang="ts" setup>
import { Dialog, DialogContent } from "@/components/common/dialog/dialog";
import Boundary from "@/components/common/states/boundary.vue";
import { useTemplateRef } from "vue";
import type { AppointmentId } from "@/features/bookings/models/appointment/id";
import { useAppointment } from "@/features/bookings/composables/use-appointment";
import { getFullName } from "@/lib/name";
import Loading from "@/components/common/states/loading.vue";

const props = defineProps<{
    modelValue: boolean;
    id: AppointmentId;
}>();

const { appointment, loading, error } = useAppointment(props.id);
const boundary = useTemplateRef<InstanceType<typeof Boundary>>("boundary");
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
    <Dialog
        :open="modelValue"
        @update:open="$emit('update:modelValue', $event)"
    >
        <Boundary ref="boundary">
            <Loading v-if="loading || !appointment" />

            <DialogContent
                v-else
                :title="`Appointment with ${getFullName(appointment.providerFirstName, appointment.providerLastName)}`"
                :description="
                    new Date(appointment.date).toLocaleDateString('en-GB', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'numeric',
                    })
                "
                :closeable="true"
            >
                <Boundary ref="boundary">
                    {{ appointment.id }}
                </Boundary>
            </DialogContent>
        </Boundary>
    </Dialog>
</template>
