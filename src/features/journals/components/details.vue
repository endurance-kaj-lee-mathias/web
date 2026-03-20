<script lang="ts" setup>
import { Dialog, DialogContent } from "@/components/common/dialog/dialog";
import Box from "@/components/common/inputs/box.vue";
import Column from "@/components/common/layout/column.vue";
import { Gap } from "@/components/common/layout/gap";
import { Size } from "@/components/common/layout/grid";
import Grid from "@/components/common/layout/grid.vue";
import Boundary from "@/components/common/states/boundary.vue";
import { getFace } from "@/features/journals/lib/faces";
import type { Day } from "@/features/journals/models/journal/day";
import { useTemplateRef } from "vue";
import Score from "@/features/journals/components/score.vue";

const props = defineProps<{
    modelValue: boolean;
    day: Day;
}>();

const boundary = useTemplateRef<InstanceType<typeof Boundary>>("boundary");
const emit = defineEmits(["update:modelValue"]);

const date = new Date(props.day.date).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "numeric",
});
</script>

<template>
    <Dialog
        :open="modelValue"
        @update:open="$emit('update:modelValue', $event)"
    >
        <DialogContent title="Mood Entry" :description="date" :closeable="true">
            <Boundary ref="boundary">
                <Column :gap="Gap.LARGE">
                    <Grid :size="Size.SMALL">
                        <Score label="Mood">
                            <img
                                :src="`/images/faces/${getFace(day.avgMood)}.svg`"
                                class="w-12"
                            />
                            <p class="text-lg font-bold text-medium">
                                {{ Math.round(day.avgMood) }} / 10
                            </p>
                        </Score>

                        <Score label="Stress">
                            <img src="/images/graph.svg" class="w-12" />
                            <p class="text-lg font-bold text-medium">
                                {{
                                    day.avgStress
                                        ? `${Math.round(day.avgStress)}/10`
                                        : "No stress data found"
                                }}
                            </p>
                        </Score>
                    </Grid>

                    <Box label="Notes" :disabled="true">
                        <p
                            v-if="day.notes && day.notes.length > 0"
                            v-for="note in day.notes"
                        >
                            {{ note }}
                        </p>

                        <p v-else>No notes found!</p>
                    </Box>
                </Column>
            </Boundary>
        </DialogContent>
    </Dialog>
</template>
