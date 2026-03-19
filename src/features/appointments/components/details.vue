<script lang="ts" setup>
import { Dialog, DialogContent } from "@/components/common/dialog/dialog";
import { getFullName } from "@/lib/name";
import { getDate, getTime } from "@/lib/date";
import Input from "@/components/common/inputs/input.vue";
import Grid from "@/components/common/layout/grid.vue";
import Column from "@/components/common/layout/column.vue";
import type { Appointment } from "@/features/appointments/models/appointment/appointment";

defineProps<{
    modelValue: boolean;
    appointment: Appointment;
}>();

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
    <Dialog
        :open="modelValue"
        @update:open="$emit('update:modelValue', $event)"
    >
        <DialogContent
            :title="`Appointment with ${getFullName(appointment.providerFirstName, appointment.providerLastName)}`"
            :description="`${new Date(appointment.startTime).toLocaleDateString(
                'en-GB',
                {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'numeric',
                },
            )}, ${getTime(appointment.startTime)} to ${getTime(appointment.endTime)}`"
            :closeable="true"
        >
            <Column>
                <Input label="Date" :disabled="true">
                    {{ getDate(appointment.startTime) }}
                </Input>

                <Grid>
                    <Input label="Title" :disabled="true">
                        {{ appointment.title }}
                    </Input>

                    <Input label="Urgency" :disabled="true">
                        {{ appointment.isUrgent ? "Urgent" : "Not Urgent" }}
                    </Input>
                </Grid>

                <Input label="Connection" :disabled="true">
                    {{
                        getFullName(
                            appointment.providerFirstName,
                            appointment.providerLastName,
                        )
                    }}
                </Input>

                <Grid>
                    <Input label="From" :disabled="true">
                        {{ getTime(appointment.startTime) }}
                    </Input>
                    <Input label="To" :disabled="true">
                        {{ getTime(appointment.endTime) }}
                    </Input>
                </Grid>
            </Column>
        </DialogContent>
    </Dialog>
</template>
