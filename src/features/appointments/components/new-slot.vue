<script lang="ts" setup>
import Button from "@/components/common/buttons/button.vue";
import { Dialog, DialogContent } from "@/components/common/dialog/dialog";
import Column from "@/components/common/layout/column.vue";
import { ref, watch } from "vue";
import DateInput from "@/components/common/inputs/date.vue";
import Time from "@/components/common/inputs/time.vue";
import Select from "@/components/common/inputs/select.vue";
import { useTemplateRef } from "vue";
import Boundary from "@/components/common/states/boundary.vue";
import { add as addSlot } from "@/features/appointments/services/slots";
import Grid from "@/components/common/layout/grid.vue";

const props = defineProps<{ modelValue: boolean; day: Date }>();
const emit = defineEmits(["update:modelValue", "created"]);

defineExpose({ add });
const boundary = useTemplateRef<InstanceType<typeof Boundary>>("boundary");

function reset(date: Date): Date {
    date.setSeconds(0, 0);
    return date;
}

const date = ref(reset(new Date(props.day)));
const startTime = ref(new Date(props.day));
const endTime = ref(new Date(props.day.getTime() + 60 * 60 * 1000));

watch(
    () => props.day,
    (day) => {
        startTime.value = new Date(day);
        endTime.value = new Date(day.getTime() + 60 * 60 * 1000);
    },
);

const urgent = ref(false);
const recurring = ref(false);

async function add() {
    function combine(date: Date, time: Date): Date {
        return new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            time.getHours(),
            time.getMinutes(),
            0,
            0,
        );
    }

    try {
        await addSlot(
            combine(date.value, startTime.value),
            combine(date.value, endTime.value),
            urgent.value,
            recurring.value,
        );
        boundary.value!.error = null;
        emit("created");
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
            title="Slots"
            description="Add"
            :closeable="true"
            :footer="true"
        >
            <Boundary ref="boundary">
                <Column>
                    <DateInput label="Date" v-model="date" />

                    <Grid>
                        <Time label="From" v-model="startTime" />
                        <Time label="To" v-model="endTime" />
                    </Grid>

                    <Select label="Urgency" v-model="urgent">
                        <option :value="false">Not Urgent</option>
                        <option :value="true">Urgent</option>
                    </Select>

                    <Select
                        label="Recurring"
                        description="For the next 8 weeks"
                        v-model="recurring"
                    >
                        <option :value="false">Not Recurring</option>
                        <option :value="true">Recurring</option>
                    </Select>
                </Column>
            </Boundary>

            <template v-slot:footer>
                <Button :action="add">Add</Button>
            </template>
        </DialogContent>
    </Dialog>
</template>
