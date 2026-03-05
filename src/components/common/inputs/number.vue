<script setup lang="ts">
import Input from "@/components/common/inputs/input.vue";

defineProps<{
    modelValue?: number;
    label?: string;
    description?: string;
    disabled?: boolean;
    required?: boolean;
    centered?: boolean;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", value: string): void;
}>();
</script>

<template>
    <Input
        :modelValue="String(modelValue)"
        @update:modelValue="emit('update:modelValue', $event)"
        :label="label"
        :description="description"
        :required="required"
        :disabled="disabled"
        :centered="centered"
        type="number"
    />
</template>
