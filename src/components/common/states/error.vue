<script setup>
import { ref, onErrorCaptured } from "vue";
import Stack from "../layout/stack.vue";
import { Justify } from "../layout/justify";
import { Align } from "../layout/align";

const error = ref(null);
const message = ref("");

onErrorCaptured((err, instance, info) => {
    error.value = err;
    message.value = info;
    return false;
});
</script>

<template>
    <Stack v-if="error" :justify="Justify.CENTER" :align="Align.CENTER">
        <p class="text-medium">Something went wrong!</p>
        <p class="text-medium-2 text-sm">"{{ message }}"</p>
    </Stack>

    <section v-else>
        <slot />
    </section>
</template>
