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

function toTimeString(date?: Date): string {
    if (!date) return "";
    const h = date.getHours().toString().padStart(2, "0");
    const m = date.getMinutes().toString().padStart(2, "0");
    return `${h}:${m}`;
}

function onInput(value: string) {
    if (!value) return;
    const [hours, minutes] = value.split(":").map(Number);
    if (!hours || !minutes) return;

    const updated = props.modelValue ? new Date(props.modelValue) : new Date();
    updated.setHours(hours, minutes, 0, 0);
    emit("update:modelValue", updated);
}
</script>

<template>
    <Input
        :modelValue="toTimeString(modelValue)"
        @update:modelValue="onInput($event)"
        :label="label"
        :description="description"
        :required="required"
        :disabled="disabled"
        :centered="centered"
        type="time"
    />
</template>
