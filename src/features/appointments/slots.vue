<script setup lang="ts">
import { Gap } from "@/components/common/layout/gap";
import Base from "@/components/layout/base.vue";
import Calendar from "@/components/common/calendar.vue";
import Boundary from "@/components/common/states/boundary.vue";
import { useTemplateRef, watchEffect } from "vue";
import { ref, watch } from "vue";
import Header from "@/features/appointments/components/header.vue";
import Loading from "@/components/common/states/loading.vue";
import PlusIcon from "@/components/icons/plus.vue";
import Button from "@/components/common/buttons/button.vue";
import Empty from "@/components/common/states/empty.vue";
import { useMySlots } from "@/features/appointments/composables/use-my-slots";
import type { Slot } from "@/features/appointments/models/slot/slot";
import { move } from "@/features/appointments/lib/move";
import New from "@/features/appointments/components/new-slot.vue";
import Details from "@/features/appointments/components/slot-details.vue";
import SlotCard from "@/features/appointments/components/slot.vue";

const boundary = useTemplateRef<InstanceType<typeof Boundary>>("boundary");
const day = ref(new Date());
const add = ref(false);
const details = ref(false);

const { slots, loading, error, fetch } = useMySlots();
const slot = ref(null as Slot | null);

watch(day, (day) => fetch(day));
watchEffect(() => error.value && boundary.value?.capture(error.value));
const handleMove = (pages: { month: number; year: number }[]) =>
    move(day, pages);

function select(value: Slot) {
    slot.value = value;
    details.value = true;
}
</script>

<template>
    <Base>
        <Header />
        <Boundary ref="boundary">
            <Loading v-if="loading" />

            <section
                v-else
                :class="`grid sm:grid-cols-[200px_1fr] ${Gap.MEDIUM} `"
            >
                <section
                    :class="`flex flex-col ${Gap.MEDIUM} overflow-y-scroll no-scrollbar`"
                >
                    <Button :action="() => (add = true)"
                        ><PlusIcon /> Slot</Button
                    >

                    <Empty
                        v-if="!slots || slots.length === 0"
                        message="No slots found"
                    />

                    <section v-else class="bg-light-2 rounded-md p-2 shadow-sm">
                        <p v-for="slot in slots" @click="select(slot)">
                            <SlotCard
                                :from="slot.startTime"
                                :to="slot.endTime"
                                :urgent="slot.isUrgent"
                                :booked="slot.isBooked"
                            />
                        </p>
                    </section>
                </section>

                <Calendar
                    @dayclick="(d) => (day = d.noonDate)"
                    @did-move="handleMove"
                />

                <New
                    v-model="add"
                    @sent="add = false"
                    :day="day"
                    @created="add = false"
                />

                <Details
                    v-if="day && slot"
                    :slot="slot"
                    v-model="details"
                    @removed="slot = null"
                />
            </section>
        </Boundary>
    </Base>
</template>
