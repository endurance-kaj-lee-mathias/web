<script setup lang="ts">
import { Gap } from "@/components/common/layout/gap";
import type { AppointmentId } from "@/features/bookings/models/id";
import { getFullName } from "@/lib/name";

defineProps<{
    id: AppointmentId;
    image: string;
    firstName: string;
    lastName: string;
    username: string;
    date: Date;
}>();
</script>

<template>
    <article
        :class="`grid grid-cols-[auto_1fr] ${Gap.MEDIUM} p-2 bg-light-2 hover:bg-accent hover:text-light cursor-pointer transition-colors duration-75 rounded-md group select-none`"
    >
        <section
            class="bg-cover shadow-sm bg-center min-w-10 min-h-10 w-full h-full rounded-lg bg-accent"
            :style="`background-image: url('${image}');`"
        />

        <section class="flex flex-col -space-y-0.5">
            <p>{{ getFullName(firstName, lastName) }}</p>
            <p
                :class="`text-sm text-medium group-hover:text-light transition-colors duration-75`"
            >
                {{
                    new Date(date).toLocaleDateString("en-GB", {
                        weekday: "long",
                        day: "numeric",
                        month: "numeric",
                    })
                }}
            </p>
        </section>
    </article>
</template>
