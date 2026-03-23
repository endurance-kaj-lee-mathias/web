<script lang="ts" setup>
import { Dialog, DialogContent } from "@/components/common/dialog/dialog";
import { getFullName } from "@/lib/name";
import { getDate, getTime } from "@/lib/date";
import Input from "@/components/common/inputs/input.vue";
import Grid from "@/components/common/layout/grid.vue";
import Column from "@/components/common/layout/column.vue";
import type { Appointment } from "@/features/appointments/models/appointment/appointment";
import { Size } from "@/components/common/layout/grid";
import Box from "@/components/common/inputs/box.vue";

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
                <Grid :size="Size.SMALL">
                    <Input label="Date" :disabled="true">
                        {{ getDate(appointment.startTime) }}
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

                <Box label="Title" :disabled="true">
                    {{ appointment.title }}
                </Box>
            </Column>
        </DialogContent>
    </Dialog>
</template>
