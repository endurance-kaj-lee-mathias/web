<script setup lang="ts">
import { Align } from "@/components/common/layout/align";
import { Gap } from "@/components/common/layout/gap";

defineProps<{
    modelValue?: any;
    label?: string;
    description?: string;
    disabled?: boolean;
    required?: boolean;
}>();
</script>

<template>
    <label :for="label" class="flex flex-col">
        <span v-if="label" class="text-medium-2"
            >{{ label }}
            <span v-if="required" class="text-medium-2 text-sm">*</span>
        </span>
        <small class="text-slate-600">{{ description }}</small>
        <span
            v-if="disabled"
            :class="`bg-light-2 shadow-sm text-medium rounded-md h-9 px-2 flex ${Gap.MEDIUM} ${Align.CENTER}`"
        >
            <slot />
        </span>
        <select
            v-else
            class="bg-light-2 shadow-sm text-medium rounded-md h-9 px-2"
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
    </label>
</template>
