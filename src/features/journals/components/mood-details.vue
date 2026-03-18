<script lang="ts" setup>
import { Dialog, DialogContent } from "@/components/common/dialog/dialog";
import Box from "@/components/common/inputs/box.vue";
import { Align } from "@/components/common/layout/align";
import Column from "@/components/common/layout/column.vue";
import { Gap } from "@/components/common/layout/gap";
import { Justify } from "@/components/common/layout/justify";
import Boundary from "@/components/common/states/boundary.vue";
import type { Mood } from "@/features/journals/models/journal/mood";
import { useTemplateRef } from "vue";
import { getFace } from "@/features/journals/lib/faces";

const props = defineProps<{
    modelValue: boolean;
    mood: Mood;
}>();

const boundary = useTemplateRef<InstanceType<typeof Boundary>>("boundary");
const emit = defineEmits(["update:modelValue"]);

const date = new Date(props.mood.date).toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
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
                    <label class="flex flex-col">
                        <span class="text-medium-2">Mood</span>
                        <section
                            :class="`bg-light-2 shadow-sm rounded-lg p-2 min-h-36 flex flex-col ${Justify.CENTER} ${Align.CENTER} ${Gap.MEDIUM}`"
                        >
                            <img
                                :src="`/images/faces/${getFace(mood.moodScore)}.svg`"
                                class="w-12"
                            />
                            <p class="text-lg font-bold text-medium">
                                {{ mood.moodScore }} / 10
                            </p>
                        </section>
                    </label>

                    <Box label="Note" :disabled="true">
                        {{ mood.notes ?? "No note found!" }}
                    </Box>
                </Column>
            </Boundary>
        </DialogContent>
    </Dialog>
</template>
