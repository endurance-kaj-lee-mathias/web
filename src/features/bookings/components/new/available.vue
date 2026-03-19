<script lang="ts" setup>
import Small from "@/components/common/buttons/small.vue";
import { SmallStyle } from "@/components/common/buttons/style";
import Card from "@/components/common/card/card.vue";
import Column from "@/components/common/layout/column.vue";
import { Height } from "@/components/common/layout/height";
import Boundary from "@/components/common/states/boundary.vue";
import Empty from "@/components/common/states/empty.vue";
import Loading from "@/components/common/states/loading.vue";
import AddIcon from "@/components/icons/add.vue";
import { useSlots } from "@/features/bookings/composables/use-slots";
import type { Slot } from "@/features/bookings/models/slot/slot";
import type { ConnectionId } from "@/features/network/models/id";
import { getDate, getTime } from "@/lib/date";
import { useTemplateRef, watchEffect } from "vue";
import { useSlot } from "@/features/bookings/stores/slot";

const props = defineProps<{
    id: ConnectionId;
}>();

const boundary = useTemplateRef<InstanceType<typeof Boundary>>("boundary");
const emit = defineEmits(["update:modelValue", "selected"]);

const store = useSlot();
const { slots, loading, error } = useSlots(props.id);
watchEffect(() => error.value && boundary.value?.capture(error.value));

function select(value: Slot) {
    store.select(value);
    emit("selected");
}
</script>

<template>
    <Boundary ref="boundary">
        <Loading v-if="loading || !slots" />

        <Column v-else>
            <Empty v-if="slots.length <= 0" message="No slots found" />

            <Column v-else>
                <Card
                    v-for="slot in slots"
                    :title="getDate(slot.startTime)"
                    :image="slot.id"
                    :options="true"
                    :height="Height.SMALL"
                >
                    <p>
                        {{ getTime(slot.startTime) }} -
                        {{ getTime(slot.endTime) }}
                    </p>

                    <template v-slot:options>
                        <Small
                            :style="SmallStyle.ALTERNATE"
                            :action="() => select(slot)"
                        >
                            <AddIcon />
                        </Small>
                    </template>
                </Card>
            </Column>
        </Column>
    </Boundary>
</template>
