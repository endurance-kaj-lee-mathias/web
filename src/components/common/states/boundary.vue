<script lang="ts" setup>
import { ref, onErrorCaptured } from "vue";
import Stack from "@/components/common/layout/stack.vue";
import Link from "@/components/common/link.vue";
import { Justify } from "@/components/common/layout/justify";
import { Align } from "@/components/common/layout/align";
import router from "@/router/router";

const error = ref<Error | null>(null);

function capture(err: unknown) {
    if (!err) return;
    error.value = err instanceof Error ? err : new Error(String(err));
}

function reset() {
    error.value = null;
}

onErrorCaptured((err) => {
    capture(err);
    return false;
});

defineExpose({ capture, reset, error });
</script>

<template>
    <section v-if="error" class="my-4">
        <Stack :justify="Justify.CENTER" :align="Align.CENTER">
            <p class="text-medium">Something went wrong!</p>

            <p class="text-medium-2 text-sm">"{{ error.message }}"</p>

            <p class="text-medium-2 text-sm">
                Click
                <Link :action="() => router.go(0)">here</Link>
                to reload
            </p>
        </Stack>
    </section>

    <section v-else>
        <slot />
    </section>
</template>
