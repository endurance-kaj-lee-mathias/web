<script lang="ts" setup>
import { Dialog, DialogContent } from "@/components/common/dialog/dialog";
import { getDate, getTime } from "@/lib/date";
import Input from "@/components/common/inputs/input.vue";
import Grid from "@/components/common/layout/grid.vue";
import Column from "@/components/common/layout/column.vue";
import type { Slot } from "@/features/appointments/models/slot/slot";
import Button from "@/components/common/buttons/button.vue";
import { useTemplateRef } from "vue";
import Boundary from "@/components/common/states/boundary.vue";
import { remove as removeSlot } from "@/features/appointments/services/slots";

const props = defineProps<{
    modelValue: boolean;
    slot: Slot;
}>();

const emit = defineEmits(["update:modelValue", "removed"]);
const boundary = useTemplateRef<InstanceType<typeof Boundary>>("boundary");

async function remove() {
    try {
        await removeSlot(props.slot.id);
        boundary.value!.error = null;
        emit("removed");
    } catch (error: unknown) {
        boundary.value!.error = error as Error;
    }
}
</script>

<template>
    <Dialog
        :open="modelValue"
        @update:open="$emit('update:modelValue', $event)"
    >
        <DialogContent
            :title="`Slot on ${getDate(slot.startTime)}`"
            :description="`${getTime(slot.startTime)} to ${getTime(slot.endTime)}`"
            :closeable="true"
            :footer="!slot.isBooked"
        >
            <Boundary ref="boundary">
                <Column>
                    <Input label="Date" :disabled="true">
                        {{ getDate(slot.startTime) }}
                    </Input>

                    <Grid>
                        <Input label="From" :disabled="true">
                            {{ getTime(slot.startTime) }}
                        </Input>
                        <Input label="To" :disabled="true">
                            {{ getTime(slot.endTime) }}
                        </Input>
                    </Grid>

                    <Grid>
                        <Input label="Urgency" :disabled="true">
                            {{ slot.isUrgent ? "Urgent" : "Normal" }}
                        </Input>

                        <Input label="Booked" :disabled="true">
                            {{ slot.isBooked ? "Booked" : "Not Booked" }}
                        </Input>
                    </Grid>
                </Column>
            </Boundary>

            <template v-slot:footer>
                <Button :action="remove">Remove</Button>
            </template>
        </DialogContent>
    </Dialog>
</template>
