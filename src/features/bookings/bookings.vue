<script setup lang="ts">
import { Gap } from "@/components/common/layout/gap";
import Empty from "@/components/common/states/empty.vue";
import Base from "@/components/layout/base.vue";
import { Calendar } from "v-calendar";
import Button from "@/components/common/buttons/button.vue";
import AddIcon from "@/components/icons/add.vue";
import Boundary from "@/components/common/states/boundary.vue";
import { useTemplateRef, watchEffect } from "vue";
import { useAppointments } from "@/features/bookings/composables/use-appointments";
import { ref } from "vue";

const boundary = useTemplateRef<InstanceType<typeof Boundary>>("boundary");
const day = ref(null as Date | null);
const { appointments, loading, error } = useAppointments(day.value);
watchEffect(() => error.value && boundary.value?.capture(error.value));
</script>

<template>
    <Base>
        <Boundary ref="boundary">
            <section :class="`grid sm:grid-cols-[200px_1fr] ${Gap.MEDIUM} `">
                <section
                    :class="`flex flex-col ${Gap.MEDIUM} overflow-y-scroll no-scrollbar`"
                >
                    <Button> <AddIcon /> Appointment </Button>

                    <section
                        v-if="day && appointments && appointments.length <= 0"
                        class="bg-light-2 rounded-md p-2"
                    ></section>
                </section>

                <Calendar
                    class="calendar"
                    color="gray"
                    :expanded="true"
                    @dayclick="(d) => (day = d.date)"
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
</style>
