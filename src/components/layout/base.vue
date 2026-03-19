<script setup lang="ts">
import Bar from "@/components/layout/bar/bar.vue";
import Footer from "@/components/layout/footer.vue";
import { Gap } from "@/components/common/layout/gap";
</script>

<template>
    <section
        className="flex flex-col gap-8 justify-between min-h-screen mx-auto max-w-4xl px-4 pt-4 pb-0.5"
    >
        <section className="flex flex-col gap-4 md:gap-12">
            <section className="w-full">
                <Bar />
            </section>

            <section
                :class="`flex flex-col ${Gap.MEDIUM} mx-auto max-w-3xl w-full`"
            >
                <slot />
            </section>
        </section>

        <Footer />
    </section>
</template>
