<script lang="ts" setup>
import Button from "@/components/common/buttons/button.vue";
import { Dialog, DialogContent } from "@/components/common/dialog/dialog";
import Column from "@/components/common/layout/column.vue";
import Box from "@/components/common/inputs/box.vue";
import { ref, watch } from "vue";

const props = defineProps<{
    modelValue: boolean;
    username: string;
    send: (username: string, note: string) => void;
}>();

const emit = defineEmits(["update:modelValue"]);
const note = ref("");

watch(
    () => props.username,
    (username) => {
        if (!username) return;
        note.value = `Hello @${username}, I would like to connect with you on the Endurance platform!`;
    },
    { immediate: true },
);
</script>

<template>
    <Dialog
        :open="modelValue"
        @update:open="$emit('update:modelValue', $event)"
    >
        <DialogContent
            title="Request"
            :description="`Send a request to @${username}`"
            :footer="true"
            :closeable="true"
        >
            <Column>
                <Box label="Note" v-model="note" />
            </Column>

            <template v-slot:footer>
                <Button @click="() => send(username, note)">Send</Button>
            </template>
        </DialogContent>
    </Dialog>
</template>
