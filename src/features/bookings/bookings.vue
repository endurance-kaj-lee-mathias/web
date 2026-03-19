<script setup lang="ts">
import { Gap } from "@/components/common/layout/gap";
import Base from "@/components/layout/base.vue";
import { DatePicker } from "v-calendar";
import Boundary from "@/components/common/states/boundary.vue";
import { useTemplateRef, watchEffect } from "vue";
import { useAppointments } from "@/features/bookings/composables/use-appointments";
import { ref, watch } from "vue";
import Details from "@/features/bookings/components/details.vue";
import type { AppointmentId } from "@/features/bookings/models/appointment/id";
import Header from "@/features/bookings/components/header.vue";
import Appointment from "@/features/bookings/components/appointment.vue";
import Empty from "@/components/common/states/empty.vue";
import Loading from "@/components/common/states/loading.vue";

const boundary = useTemplateRef<InstanceType<typeof Boundary>>("boundary");
const day = ref(new Date());
const details = ref(false);

const { appointments, loading, error, fetch } = useAppointments(day.value);
const appointment = ref(null as AppointmentId | null);

watch(day, (day) => fetch(day));
watchEffect(() => error.value && boundary.value?.capture(error.value));

const move = (pages: { month: number; year: number }[]) => {
    const page = pages[0];
    if (!page) return;

    if (
        day.value.getMonth() + 1 === page.month &&
        day.value.getFullYear() === page.year
    )
        return;

    const daysInMonth = new Date(page.year, page.month, 0).getDate();
    const clampedDay = Math.min(day.value.getDate(), daysInMonth);
    day.value = new Date(page.year, page.month - 1, clampedDay);
};
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
                    :class="`flex flex-col ${Gap.MEDIUM} overflow-y-scroll no-scrollbar bg-light-2 rounded-md p-2`"
                >
                    <Empty
                        v-if="!appointments || appointments.length <= 0"
                        message="No appointments found"
                    />

                    <Appointment
                        v-else
                        v-for="appointment in appointments"
                        :firstName="appointment.providerFirstName"
                        :lastName="appointment.providerLastName"
                        :username="appointment.providerUsername"
                        :image="appointment.providerImage"
                        :date="appointment.date"
                    />
                </section>

                <DatePicker
                    class="calendar"
                    color="gray"
                    :expanded="true"
                    @dayclick="(d) => (day = d.noonDate)"
                    @did-move="move"
                />

                <Details
                    v-if="day && appointment"
                    :id="appointment"
                    v-model="details"
                />
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
