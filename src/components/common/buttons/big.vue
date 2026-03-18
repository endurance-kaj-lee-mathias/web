<script setup lang="ts">
import { Style } from "@/components/common/buttons/style";

defineProps<{ disabled?: boolean; full?: boolean; style?: Style }>();
</script>

<template>
    <button
        :class="`flex flex-col h-16 items-center justify-center rounded-lg  px-4  py-2 ${style ?? Style.DEFAULT} font-semibold ${disabled ? 'cursor-not-allowed' : 'transition-colors duration-100 cursor-pointer'} ${full ? 'w-full' : ''}`"
        :disabled="disabled ?? false"
    >
        <slot />
    </button>
</template>
