<script setup lang="ts">
defineProps<{
    modelValue?: string;
    label?: string;
    description?: string;
    disabled?: boolean;
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
        <span
            v-if="disabled"
            class="bg-light-2 rounded-md h-8 px-2 border-medium-3 border-solid border-2 flex items-center"
        >
            <slot />
        </span>
        <input
            v-else
            :class="`bg-light-2 rounded-md h-8 px-2 border-medium-3 border-solid border-2 ${centered && 'text-center'}`"
            :value="modelValue"
            :type="type"
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
