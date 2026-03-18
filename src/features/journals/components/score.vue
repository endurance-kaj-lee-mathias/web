<script lang="ts" setup>
import { Align } from "@/components/common/layout/align";
import { Gap } from "@/components/common/layout/gap";
import { Justify } from "@/components/common/layout/justify";

defineProps<{ label: string }>();
</script>

<template>
    <label class="flex flex-col">
        <span class="text-medium-2">{{ label }}</span>
        <section
            :class="`bg-light-2 shadow-sm rounded-lg p-2 min-h-36 flex flex-col ${Justify.CENTER} ${Align.CENTER} ${Gap.MEDIUM}`"
        >
            <slot />
        </section>
    </label>
</template>
