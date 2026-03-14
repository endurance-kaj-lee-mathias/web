<script lang="ts" setup>
import { Dialog, DialogContent } from "@/components/common/dialog/dialog";
import Column from "@/components/common/layout/column.vue";
import Loading from "@/components/common/states/loading.vue";
import Boundary from "@/components/common/states/boundary.vue";
import { useTemplateRef } from "vue";
import { watch } from "vue";
import { watchEffect } from "vue";
import Empty from "@/components/common/states/empty.vue";
import { useVeterans } from "@/features/veterans/veterans/composables/use-veterans";
import Card from "@/components/common/card/card.vue";
import { getFullName } from "@/lib/name";
import MessagesIcon from "@/components/icons/messages.vue";
import Grid from "@/components/common/layout/grid.vue";
import Small from "@/components/common/buttons/small.vue";
import { Size } from "@/components/common/layout/grid";

const props = defineProps<{ modelValue: boolean }>();
const boundary = useTemplateRef<InstanceType<typeof Boundary>>("boundary");
const { veterans, loading, error } = useVeterans();
watchEffect(() => error.value && boundary.value?.capture(error.value));
const emit = defineEmits(["update:modelValue", "saved"]);

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
            title="New Chat"
            description="My Network"
            :closeable="true"
        >
            <Boundary ref="boundary">
                <Column>
                    <Loading v-if="loading || !veterans" />

                    <Column v-else>
                        <Empty
                            v-if="veterans.length <= 0"
                            message="No veterans found"
                        />

                        <Grid :size="Size.SMALL" v-else>
                            <Card
                                v-for="veteran in veterans"
                                :title="
                                    getFullName(
                                        veteran.firstName,
                                        veteran.lastName,
                                    )
                                "
                                :image="veteran.image"
                                :options="true"
                            >
                                <p>@{{ veteran.username }}</p>

                                <template v-slot:options>
                                    <Small :alternative="true">
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
