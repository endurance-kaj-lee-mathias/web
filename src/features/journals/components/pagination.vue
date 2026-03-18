<script setup lang="ts">
import Button from "@/components/common/buttons/button.vue";
import Input from "@/components/common/inputs/input.vue";
import { Justify } from "@/components/common/layout/justify";
import Row from "@/components/common/layout/row.vue";
import Next from "@/components/icons/next.vue";
import Previous from "@/components/icons/previous.vue";
import { computed, ref, watch } from "vue";

const props = defineProps<{ max: number }>();
const emit = defineEmits<{ (e: "update:modelValue", page: number): void }>();
const week = ref(0);

watch(week, (week) => emit("update:modelValue", week));

function next() {
    if (week.value <= 0) return;
    week.value--;
}

function previous() {
    if (week.value >= props.max) return;
    week.value++;
}

const label = computed(() => {
    const now = new Date();
    const day = now.getDay();
    const difference = day === 0 ? -6 : 1 - day;
    const monday = new Date(now);

    monday.setDate(now.getDate() + difference - week.value * 7);
    monday.setHours(0, 0, 0, 0);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    const format = (date: Date) =>
        date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "numeric",
        });

    return `${format(monday)} - ${format(sunday)}`;
});
</script>

<template>
    <Row :justify="Justify.END">
        <Button @click="previous"> <Previous /> </Button>
        <Input :disabled="true">{{ label }}</Input>
        <Button @click="next"> <Next /> </Button>
    </Row>
</template>
