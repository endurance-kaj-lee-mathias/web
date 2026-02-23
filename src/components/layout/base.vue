<script setup lang="ts">
import Bar from "@/components/layout/bar/bar.vue";
import Top from "@/components/layout/top/top.vue";
import { Gap } from "@/components/common/layout/gap";
</script>

<template>
    <main class="flex w-screen h-screen">
        <Bar />

        <section :class="`w-screen h-screen flex flex-col ${Gap.MEDIUM}`">
            <Top />

            <section
                :class="`flex flex-col ${Gap.MEDIUM} p-2 h-full grow overflow-auto`"
            >
                <slot />
            </section>
        </section>
    </main>
</template>
