<script lang="ts" setup>
import Boundary from "@/components/common/states/boundary.vue";
import Base from "@/components/layout/base.vue";
import Header from "@/features/appointments/components/header.vue";
import { useMySlots } from "@/features/appointments/composables/use-my-slots";
import { remove as removeSlot } from "@/features/appointments/services/slots";
import { useTemplateRef, watchEffect } from "vue";
import Small from "@/components/common/buttons/small.vue";
import { SmallStyle } from "@/components/common/buttons/style";
import Card from "@/components/common/card/card.vue";
import Column from "@/components/common/layout/column.vue";
import { Height } from "@/components/common/layout/height";
import Empty from "@/components/common/states/empty.vue";
import Loading from "@/components/common/states/loading.vue";
import { getDate, getTime } from "@/lib/date";
import { ref } from "vue";
import Pagination from "@/features/appointments/components/pagination.vue";
import Row from "@/components/common/layout/row.vue";
import { Justify } from "@/components/common/layout/justify";
import Button from "@/components/common/buttons/button.vue";
import PlusIcon from "@/components/icons/plus.vue";
import Stack from "@/components/common/layout/stack.vue";
import MinusIcon from "@/components/icons/minus.vue";
import type { SlotId } from "@/features/appointments/models/slot/id";
import New from "@/features/appointments/components/new-slot.vue";
import { Gap } from "@/components/common/layout/gap";
import DangerIcon from "@/components/icons/danger.vue";
import TagIcon from "@/components/icons/tag.vue";
import Grid from "@/components/common/layout/grid.vue";
import { Size } from "@/components/common/layout/grid";

const weeks = ref(1);
const add = ref(false);
const { days, loading, error, fetch } = useMySlots(() => weeks.value);

const boundary = useTemplateRef<InstanceType<typeof Boundary>>("boundary");
watchEffect(() => error.value && boundary.value?.capture(error.value));

async function remove(id: SlotId) {
    try {
        await Promise.all([await removeSlot(id), await fetch(weeks.value)]);
        boundary.value!.error = null;
    } catch (error: unknown) {
        boundary.value!.error = error as Error;
    }
}
</script>

<template>
    <Base>
        <Header />

        <Boundary ref="boundary">
            <Loading v-if="loading || !days" />

            <Column v-else>
                <Row :justify="Justify.BETWEEN">
                    <Button :action="() => (add = true)"
                        ><PlusIcon /> Slot</Button
                    >
                    <Pagination v-model="weeks" />
                </Row>

                <Empty v-if="days.length <= 0" message="No slots found" />

                <Column v-else>
                    <Stack v-for="day in days">
                        <p class="text-medium text-lg">
                            {{ getDate(day.date) }}
                        </p>

                        <Grid :size="Size.SMALL">
                            <Card
                                v-for="slot in day.slots"
                                :title="`${getTime(slot.startTime)} - ${getTime(slot.endTime)}`"
                                :image="slot.id"
                                :options="true"
                                :height="Height.SMALL"
                            >
                                <Row>
                                    <Row :gap="Gap.SMALL">
                                        <TagIcon />
                                        {{
                                            slot.isBooked
                                                ? "Available"
                                                : "Unavailable"
                                        }}
                                    </Row>

                                    <Row :gap="Gap.SMALL">
                                        <DangerIcon />
                                        {{
                                            slot.isUrgent
                                                ? "Urgent"
                                                : "Not Urgent"
                                        }}
                                    </Row>
                                </Row>

                                <template v-slot:options>
                                    <Small
                                        :style="SmallStyle.ALTERNATE"
                                        :action="() => remove(slot.id)"
                                    >
                                        <MinusIcon />
                                    </Small>
                                </template>
                            </Card>
                        </Grid>
                    </Stack>
                </Column>

                <New v-model="add" @created="add = false" />
            </Column>
        </Boundary>
    </Base>
</template>
