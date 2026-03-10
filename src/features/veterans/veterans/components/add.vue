<script lang="ts" setup>
import Button from "@/components/common/buttons/button.vue";
import { Dialog, DialogContent } from "@/components/common/dialog/dialog";
import Column from "@/components/common/layout/column.vue";
import Box from "@/components/common/inputs/box.vue";
import { ref } from "vue";

defineProps<{
    modelValue: boolean;
    username: string;
    send: (username: string, note: string) => void;
}>();

const emit = defineEmits(["update:modelValue"]);
const note = ref("");
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
