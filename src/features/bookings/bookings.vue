<script setup lang="ts">
import { Gap } from "@/components/common/layout/gap";
import Base from "@/components/layout/base.vue";
import { DatePicker } from "v-calendar";
import Button from "@/components/common/buttons/button.vue";
import AddIcon from "@/components/icons/add.vue";
import Boundary from "@/components/common/states/boundary.vue";
import { useTemplateRef, watchEffect } from "vue";
import { useAppointments } from "@/features/bookings/composables/use-appointments";
import { ref, watch } from "vue";
import Details from "@/features/bookings/components/details.vue";
import type { AppointmentId } from "@/features/bookings/models/id";
import New from "@/features/bookings/components/new/new.vue";

const boundary = useTemplateRef<InstanceType<typeof Boundary>>("boundary");
const day = ref(new Date());
const details = ref(false);
const network = ref(false);

const { appointments, error, fetch } = useAppointments(day.value);
const appointment = ref(null as AppointmentId | null);

watch(day, (day) => fetch(day));
watchEffect(() => error.value && boundary.value?.capture(error.value));

const move = (pages: { month: number; year: number }[]) => {
    const page = pages[0];
    if (!page) return;
    const newDay = new Date(day.value ?? new Date());
    newDay.setFullYear(page.year);
    newDay.setMonth(page.month - 1);
    day.value = newDay;
};
</script>

<template>
    <Base>
        <Boundary ref="boundary">
            <section :class="`grid sm:grid-cols-[200px_1fr] ${Gap.MEDIUM} `">
                <section
                    :class="`flex flex-col ${Gap.MEDIUM} overflow-y-scroll no-scrollbar`"
                >
                    <Button @click="network = true">
                        <AddIcon /> Appointment
                    </Button>

                    <section
                        v-if="day && appointments && appointments.length <= 0"
                        class="bg-light-2 rounded-md p-2"
                    ></section>
                </section>

                <DatePicker
                    class="calendar"
                    color="gray"
                    :expanded="true"
                    v-model="day"
                    @did-move="move"
                />

                <Details
                    v-if="day && appointment"
                    :id="appointment"
                    v-model="details"
                />

                <New v-if="day" :day="day" v-model="network" />
            </section>
        </Boundary>
    </Base>
</template>

<style lang="postcss" scoped>
@reference "tailwindcss/theme";
:deep(.vc-container) {
    font-family: "Nunito";
    background-color: var(--color-light-2);
    border: none;
}

:deep(.vc-nav-item) {
    color: var(--color-medium);
    background-color: var(--color-light-2);
}

:deep(.vc-nav-item.is-active) {
    background-color: var(--color-accent);
    color: var(--color-light-2);
}

:deep(.vc-nav-item:hover) {
    background-color: var(--color-medium-3);
    transition: background-color 75ms;
}

:deep(.vc-nav-item:focus),
:deep(.vc-nav-item.vc-focus) {
    outline: none;
    box-shadow: none;
}

:deep(.vc-day-content) {
    border-radius: var(--radius-md);
}

:deep(.vc-day-content.vc-focus) {
    outline: none;
    box-shadow: none;
    background-color: var(--color-light-2);
}

:deep(.vc-day-content:hover) {
    background-color: var(--color-medium-3);
    transition: background-color 75ms;
}

:deep(.vc-day-content[tabindex="0"]) {
    background-color: var(--color-accent);
    color: var(--color-light-2);
}

:deep(.vc-base-icon) {
    color: var(--color-medium);
}

:deep(.vc-arrow:hover) {
    background-color: var(--color-medium-3) !important;
    transition: background-color 75ms;
}

:deep(.vc-arrow.vc-focus) {
    outline: none;
    box-shadow: none;
}

:deep(.vc-nav-arrow:hover) {
    background-color: var(--color-medium-3) !important;
    transition: background-color 75ms;
}

:deep(.vc-nav-arrow.vc-focus) {
    outline: none;
    box-shadow: none;
}

:deep(.vc-nav-title:hover) {
    background-color: var(--color-medium-3) !important;
    transition: background-color 75ms;
}

:deep(.vc-nav-title.vc-focus) {
    outline: none;
    box-shadow: none;
}
</style>
