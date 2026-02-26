<script setup lang="ts">
defineProps<{
    modelValue?: string;
    label?: string;
    description?: string;
    required?: boolean;
    centered?: boolean;
    type?: string;
}>();
</script>

<template>
    <label :for="label ?? `input-${modelValue}`" class="flex flex-col">
        <span v-if="label" class="text-medium-2"
            >{{ label }}
            <span v-if="required" class="text-medium-2 text-sm">*</span></span
        >
        <textarea
            :class="`bg-light-2 rounded-md h-24 px-2 py-1 border-medium-3 border-solid border-2 resize-none ${centered && 'text-center'}`"
            :value="modelValue"
            @input="
                (event) =>
                    $emit(
                        'update:modelValue',
                        (event.target as HTMLInputElement).value,
                    )
            "
            v-bind="$attrs"
            :id="label ?? `input-${modelValue}`"
        />
        <small v-if="description" class="text-medium-2">{{
            description
        }}</small>
    </label>
</template>
