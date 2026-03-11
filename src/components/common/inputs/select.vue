<script setup lang="ts">
defineProps<{
    modelValue?: any;
    label?: string;
    description?: string;
    required?: boolean;
}>();
</script>

<template>
    <label :for="label" class="flex flex-col">
        <span v-if="label" class="text-medium-2"
            >{{ label }}
            <span v-if="required" class="text-medium-2 text-sm">*</span></span
        >
        <select
            class="bg-medium-3 text-medium rounded-md h-8 px-2"
            :value="modelValue"
            @input="
                (event) =>
                    $emit(
                        'update:modelValue',
                        (event.target as HTMLInputElement).value,
                    )
            "
            v-bind="$attrs"
            :id="label"
        >
            <slot></slot>
        </select>
        <small class="text-slate-600">{{ description }}</small>
    </label>
</template>
