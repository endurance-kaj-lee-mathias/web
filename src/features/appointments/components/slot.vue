<script setup lang="ts">
import { Align } from "@/components/common/layout/align";
import { Gap } from "@/components/common/layout/gap";
import { Justify } from "@/components/common/layout/justify";
import ClockIcon from "@/components/icons/clock.vue";
import { getTime } from "@/lib/date";

defineProps<{
    from: Date;
    to: Date;
    urgent: boolean;
    booked: boolean;
}>();
</script>

<template>
    <article
        :class="`grid grid-cols-[auto_1fr] ${Gap.MEDIUM} p-2 bg-light-2 hover:bg-accent hover:text-light cursor-pointer transition-colors duration-75 rounded-md group select-none`"
    >
        <section
            :class="`shadow-sm min-w-10 min-h-10 w-full h-full rounded-lg bg-accent flex ${Justify.CENTER} ${Align.CENTER} text-white`"
        >
            <ClockIcon />
        </section>

        <section class="flex flex-col -space-y-0.5">
            <p :class="booked ? 'line-through decoration-2' : ''">
                {{ getTime(from) }} - {{ getTime(to) }}
            </p>
            <p
                :class="`text-sm text-medium group-hover:text-light transition-colors duration-75`"
            >
                {{ urgent ? "Urgent Slot" : "Normal Slot" }}
            </p>
        </section>
    </article>
</template>
