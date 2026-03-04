<script lang="ts" setup>
import { ref, onErrorCaptured } from "vue";
import Stack from "@/components/common/layout/stack.vue";
import { Justify } from "@/components/common/layout/justify";
import { Align } from "@/components/common/layout/align";

const error = ref<Error | null>(null);

onErrorCaptured((err) => {
    error.value = err;
    return false;
});

defineExpose({ error });
</script>

<template>
    <Stack v-if="error" :justify="Justify.CENTER" :align="Align.CENTER">
        <p class="text-medium">Something went wrong!</p>
        <p class="text-medium-2 text-sm">"{{ error.message }}"</p>
    </Stack>

    <section v-else>
        <slot />
    </section>
</template>
