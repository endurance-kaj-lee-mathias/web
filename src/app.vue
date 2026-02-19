<script setup lang="ts">
import Bar from "@/components/layout/bar/bar.vue";
import { RouterView } from "vue-router";
import { Toaster } from "vue-sonner";
</script>

<template>
    <main class="flex w-screen h-screen">
        <Bar />
        <section class="w-screen">
            <section class="flex flex-col gap-2 p-2 grow overflow-auto">
                <RouterView />
                <Toaster />
            </section>
        </section>
    </main>
</template>
