<script lang="ts" setup>
import Button from "@/components/common/buttons/button.vue";
import { Dialog, DialogContent } from "@/components/common/dialog/dialog";
import Column from "@/components/common/layout/column.vue";
import { Gap } from "@/components/common/layout/gap";
import { watch } from "vue";
import type { Request } from "@/features/veterans/requests/models/request";
import { getFullName } from "@/lib/name";
import Box from "@/components/common/inputs/box.vue";
import Grid from "@/components/common/layout/grid.vue";
import Input from "@/components/common/inputs/input.vue";
import { Size } from "@/components/common/layout/grid";

const props = defineProps<{
    modelValue: boolean;
    request: Request;
}>();

watch(
    () => props.modelValue,
    (value, old) => {
        if (!old || value) return;
    },
);
</script>

<template>
    <Dialog
        :open="modelValue"
        @update:open="$emit('update:modelValue', $event)"
    >
        <DialogContent
            title="Request"
            :description="`From @${request.sender.username}`"
            :footer="true"
            :closeable="true"
        >
            <Column>
                <Input label="Full Name" :disabled="true">
                    {{
                        getFullName(
                            request.sender.firstName,
                            request.sender.lastName,
                        )
                    }}
                </Input>

                <Box label="Note" :disabled="true">
                    {{ request.note ?? "No note found!" }}
                </Box>
            </Column>

            <template v-slot:footer>
                <Grid :size="Size.SMALL">
                    <Button>Accept</Button>
                    <Button>Decline</Button>
                </Grid>
            </template>
        </DialogContent>
    </Dialog>
</template>
