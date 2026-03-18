<script setup lang="ts">
import { Bar } from "vue-chartjs";
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    type TooltipItem,
    type ChartOptions,
} from "chart.js";
import type { Day } from "@/features/journals/models/journal/day";
import { computed } from "vue";

ChartJS.defaults.font.family = "Nunito";
ChartJS.defaults.font.size = 13;

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
);

const props = defineProps<{
    entries: Day[];
    select: (day: Day) => void;
}>();

const sorted = computed(() =>
    [...props.entries].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    ),
);

const data = computed(() => {
    return {
        labels: sorted.value.map((day: Day) =>
            new Date(day.date).toLocaleDateString("en-GB", {
                weekday: "short",
                day: "numeric",
                month: "numeric",
            }),
        ),
        datasets: [
            {
                label: "Mood",
                data: sorted.value.map((e) => e.avgMood),
                backgroundColor: "oklch(0.5341 0.0429 161.22)",
                borderColor: "oklch(0.5341 0.0429 161.22)",
                borderWidth: 1,
                borderRadius: 4,
            },
            {
                label: "Stress",
                data: sorted.value.map((e) => e.avgStress),
                backgroundColor: "oklch(0.5341 0.0429 19.61)",
                borderColor: "oklch(0.5341 0.0429 19.61)",
                borderWidth: 1,
                borderRadius: 4,
            },
        ],
    };
});

const options = computed<ChartOptions<"bar">>(() => ({
    responsive: true,
    scales: {
        y: {
            min: 0,
            max: 10,
            ticks: { stepSize: 1 },
        },
    },
    plugins: {
        tooltip: {
            callbacks: {
                label: (context: TooltipItem<"bar">) =>
                    ` ${context.parsed.y}/10`,
            },
        },
    },
    onHover: (event, elements) => {
        const target = event.native?.target as HTMLElement | null;
        if (!target) return;
        target.style.cursor = elements.length ? "pointer" : "default";
    },
    onClick: (_event, elements) => {
        const [first] = elements;
        if (!first || !props.select) return;

        const mood = sorted.value[first.index];
        if (!mood) return;

        props.select(mood);
    },
}));
</script>

<template>
    <Bar id="stress-and-mood" :options="options" :data="data" />
</template>
