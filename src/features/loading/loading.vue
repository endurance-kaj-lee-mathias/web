<script setup>
import { ref, onMounted } from "vue";
import { Gap } from "@/components/common/layout/gap";
import { Justify } from "@/components/common/layout/justify";
import Stack from "@/components/common/layout/stack.vue";
import { Align } from "@/components/common/layout/align";

const visible = ref(true);

onMounted(() => setTimeout(() => (visible.value = false), 1500));
</script>

<template>
    <section
        :class="`fixed inset-0 flex flex-col ${Justify.CENTER} ${Align.CENTER} ${Gap.EXTRA_LARGE} bg-light-2 transition-opacity duration-850 z-100 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`"
    >
        <Stack :justify="Justify.CENTER" :align="Align.CENTER">
            <h1 class="text-accent text-6xl font-bold">Endurance</h1>
            <h2 class="text-medium text-xl">
                Support
                <span class="underline decoration-2 decoration-dotted"
                    >beyond</span
                >
                service
            </h2>
        </Stack>

        <p class="text-medium animate-pulse">Getting your profile set up...</p>
    </section>
</template>
