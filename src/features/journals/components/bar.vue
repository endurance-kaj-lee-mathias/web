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
import type { Mood } from "@/features/journals/models/journal/mood";
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
    entries: Mood[];
    select: (date: Date) => void;
}>();

const sorted = computed(() =>
    [...props.entries].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    ),
);

const data = computed(() => {
    return {
        labels: sorted.value.map((e) =>
            new Date(e.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            }),
        ),
        datasets: [
            {
                label: "Mood Score",
                data: sorted.value.map((e) => e.moodScore),
                backgroundColor: "oklch(0.5341 0.0429 161.22)",
                borderColor: "oklch(0.5341 0.0429 161.22)",
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
        legend: { display: false },
        tooltip: {
            callbacks: {
                label: (context: TooltipItem<"bar">) =>
                    ` ${context.parsed.y}/10`,
            },
        },
    },
    onClick: (_event, elements) => {
        const [first] = elements;
        if (!first || !props.select) return;

        const entry = sorted.value[first.index];
        if (!entry) return;

        const date = new Date(entry.date);
        props.select(date);
    },
}));
</script>

<template>
    <Bar id="mood-entries" :options="options" :data="data" />
</template>
