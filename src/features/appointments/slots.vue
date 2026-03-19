<script lang="ts" setup>
import Boundary from "@/components/common/states/boundary.vue";
import Base from "@/components/layout/base.vue";
import Header from "@/features/appointments/components/header.vue";
import { useMySlots } from "@/features/appointments/composables/use-my-slots";
import { useTemplateRef, watchEffect } from "vue";
import Small from "@/components/common/buttons/small.vue";
import { SmallStyle } from "@/components/common/buttons/style";
import Card from "@/components/common/card/card.vue";
import Column from "@/components/common/layout/column.vue";
import { Height } from "@/components/common/layout/height";
import Empty from "@/components/common/states/empty.vue";
import Loading from "@/components/common/states/loading.vue";
import AddIcon from "@/components/icons/add.vue";
import { getDate, getTime } from "@/lib/date";
import { ref } from "vue";
import Pagination from "@/features/appointments/components/pagination.vue";
import Row from "@/components/common/layout/row.vue";
import { Justify } from "@/components/common/layout/justify";
import Button from "@/components/common/buttons/button.vue";
import PlusIcon from "@/components/icons/plus.vue";

const weeks = ref(1);
const { slots, loading, error } = useMySlots(() => weeks.value);

const boundary = useTemplateRef<InstanceType<typeof Boundary>>("boundary");
watchEffect(() => error.value && boundary.value?.capture(error.value));
</script>

<template>
    <Base>
        <Header />

        <Boundary ref="boundary">
            <Loading v-if="loading || !slots" />

            <Column v-else>
                <Empty v-if="slots.length <= 0" message="No slots found" />

                <Column v-else>
                    <Row :justify="Justify.BETWEEN">
                        <Button><PlusIcon /> New Slot</Button>
                        <Pagination v-model="weeks" />
                    </Row>

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
                                :action="() => {}"
                            >
                                <AddIcon />
                            </Small>
                        </template>
                    </Card>
                </Column>
            </Column>
        </Boundary>
    </Base>
</template>
