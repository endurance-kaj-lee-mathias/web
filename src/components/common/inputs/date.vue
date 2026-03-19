<script setup lang="ts">
import Input from "@/components/common/inputs/input.vue";

const props = defineProps<{
    modelValue?: Date;
    label?: string;
    description?: string;
    disabled?: boolean;
    required?: boolean;
    centered?: boolean;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", value: Date): void;
}>();

function toDateString(date?: Date): string {
    if (!date) return "";
    const y = date.getFullYear();
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const d = date.getDate().toString().padStart(2, "0");
    return `${y}-${m}-${d}`;
}

function onInput(value: string) {
    if (!value) return;
    const [year, month, day] = value.split("-").map(Number);
    const updated = props.modelValue ? new Date(props.modelValue) : new Date();
    updated.setFullYear(year, month - 1, day);
    emit("update:modelValue", updated);
}
</script>

<template>
    <Input
        :modelValue="toDateString(modelValue)"
        @update:modelValue="onInput($event)"
        :label="label"
        :description="description"
        :required="required"
        :disabled="disabled"
        :centered="centered"
        type="date"
    />
</template>
