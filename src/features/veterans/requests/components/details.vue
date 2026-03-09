<script lang="ts" setup>
import Button from "@/components/common/buttons/button.vue";
import { Dialog, DialogContent } from "@/components/common/dialog/dialog";
import Column from "@/components/common/layout/column.vue";
import { useTemplateRef, watch } from "vue";
import type { Request } from "@/features/veterans/requests/models/request";
import {
    accept,
    decline,
} from "@/features/veterans/requests/services/requests";
import { getFullName } from "@/lib/name";
import Box from "@/components/common/inputs/box.vue";
import Grid from "@/components/common/layout/grid.vue";
import Input from "@/components/common/inputs/input.vue";
import { Size } from "@/components/common/layout/grid";
import { reactive } from "vue";
import Error from "@/components/common/states/error.vue";
import Loading from "@/components/common/states/loading.vue";

const props = defineProps<{
    modelValue: boolean;
    request: Request;
}>();

const boundary = useTemplateRef<InstanceType<typeof Error>>("boundary");
const emit = defineEmits(["update:modelValue", "responded"]);
const state = reactive({
    loading: false,
});

watch(
    () => props.modelValue,
    (value, old) => {
        if (!old || value) return;
    },
);

async function respond(response: boolean) {
    try {
        state.loading = true;
        response
            ? await accept(props.request.id)
            : await decline(props.request.id);
        emit("responded");
        state.loading = false;
    } catch (error: unknown) {
        state.loading = false;
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
            title="Request"
            :description="`From @${request.sender.username}`"
            :footer="true"
            :closeable="true"
        >
            <Error ref="boundary">
                <Loading v-if="state.loading" />

                <Column v-else>
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
            </Error>

            <template v-slot:footer>
                <Grid :size="Size.SMALL">
                    <Button @click="respond(true)">Accept</Button>
                    <Button @click="respond(false)">Decline</Button>
                </Grid>
            </template>
        </DialogContent>
    </Dialog>
</template>
