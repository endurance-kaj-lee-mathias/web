<script setup lang="ts">
import { Gap } from "@/components/common/layout/gap";
import Base from "@/components/layout/base.vue";
import Calendar from "@/components/common/calendar.vue";
import Boundary from "@/components/common/states/boundary.vue";
import { useTemplateRef, watchEffect } from "vue";
import { useAppointments } from "@/features/appointments/composables/use-appointments";
import { ref, watch } from "vue";
import Details from "@/features/appointments/components/details.vue";
import Header from "@/features/appointments/components/header.vue";
import AppointmentCard from "@/features/appointments/components/appointment.vue";
import Loading from "@/components/common/states/loading.vue";
import type { Appointment } from "@/features/appointments/models/appointment/appointment";
import PlusIcon from "@/components/icons/plus.vue";
import Button from "@/components/common/buttons/button.vue";
import New from "@/features/appointments/components/new-appointment/new.vue";
import { hasRoles } from "@/services/authentication";
import { Role } from "@/models/roles";
import Empty from "@/components/common/states/empty.vue";
import { move } from "@/features/appointments/lib/move";

const boundary = useTemplateRef<InstanceType<typeof Boundary>>("boundary");
const day = ref(new Date());
const add = ref(false);
const details = ref(false);

const { appointments, loading, error, fetch } = useAppointments();
const appointment = ref(null as Appointment | null);

watch(day, (day) => fetch(day));
watchEffect(() => error.value && boundary.value?.capture(error.value));
const handleMove = (pages: { month: number; year: number }[]) =>
    move(day, pages);

function select(value: Appointment) {
    appointment.value = value;
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
                    <Button
                        v-if="!hasRoles([Role.THERAPIST])"
                        :action="() => (add = true)"
                        ><PlusIcon /> Appointment</Button
                    >

                    <Empty
                        v-if="!appointments || appointments.length === 0"
                        message="No appointments found"
                    />

                    <section v-else class="bg-light-2 rounded-md p-2 shadow-sm">
                        <AppointmentCard
                            v-for="appointment in appointments"
                            :firstName="appointment.providerFirstName"
                            :lastName="appointment.providerLastName"
                            :username="appointment.providerUsername"
                            :image="appointment.providerImage"
                            :date="appointment.startTime"
                            @click="select(appointment)"
                        />
                    </section>
                </section>

                <Calendar
                    @dayclick="(d) => (day = d.noonDate)"
                    @did-move="handleMove"
                />

                <New v-model="add" @sent="add = false" />

                <Details
                    v-if="day && appointment"
                    :appointment="appointment"
                    v-model="details"
                />
            </section>
        </Boundary>
    </Base>
</template>
