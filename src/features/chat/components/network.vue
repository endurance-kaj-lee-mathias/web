<script lang="ts" setup>
import { Dialog, DialogContent } from "@/components/common/dialog/dialog";
import Column from "@/components/common/layout/column.vue";
import Loading from "@/components/common/states/loading.vue";
import Boundary from "@/components/common/states/boundary.vue";
import { useTemplateRef } from "vue";
import { watch } from "vue";
import { watchEffect } from "vue";
import Empty from "@/components/common/states/empty.vue";
import { useConnections } from "@/features/network/connections/composables/use-connections";
import Card from "@/components/common/card/card.vue";
import { getFullName } from "@/lib/name";
import MessagesIcon from "@/components/icons/messages.vue";
import Grid from "@/components/common/layout/grid.vue";
import Small from "@/components/common/buttons/small.vue";
import { Size } from "@/components/common/layout/grid";
import { start } from "@/features/chat/services/conversations";
import type { UserId } from "@/features/chat/models/user-id";
import { SmallStyle } from "@/components/common/buttons/style";

const props = defineProps<{ modelValue: boolean }>();
const boundary = useTemplateRef<InstanceType<typeof Boundary>>("boundary");
const { connections, loading, error } = useConnections();
watchEffect(() => error.value && boundary.value?.capture(error.value));
const emit = defineEmits(["update:modelValue", "selected"]);

watch(
    () => props.modelValue,
    (value, old) => {
        if (!old || value) return;
    },
);

async function select(id: UserId) {
    try {
        await start(id);
        emit("selected");
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
            title="New Conversation"
            description="Connections"
            :closeable="true"
        >
            <Boundary ref="boundary">
                <Column>
                    <Loading v-if="loading || !connections" />

                    <Column v-else>
                        <Empty
                            v-if="connections.length <= 0"
                            message="No connections in network found"
                        />

                        <Grid :size="Size.SMALL" v-else>
                            <Card
                                v-for="connection in connections"
                                :title="
                                    getFullName(
                                        connection.firstName,
                                        connection.lastName,
                                    )
                                "
                                :image="connection.image"
                                :options="true"
                            >
                                <p>@{{ connection.username }}</p>

                                <template v-slot:options>
                                    <Small
                                        :action="
                                            () =>
                                                select(
                                                    connection.id as string as UserId,
                                                )
                                        "
                                        :style="SmallStyle.ALTERNATE"
                                    >
                                        <MessagesIcon />
                                    </Small>
                                </template>
                            </Card>
                        </Grid>
                    </Column>
                </Column>
            </Boundary>
        </DialogContent>
    </Dialog>
</template>
