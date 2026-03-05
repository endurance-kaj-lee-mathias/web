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
        <span class="font-bold text-slate-700"
            >{{ label }}
            <span v-if="required" class="text-slate-500"
                >(verplicht)</span
            ></span
        >
        <select
            class="bg-light rounded-md h-8 px-2 border-medium-3 border-solid border-2"
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
