<script lang="ts" setup>
import { Gap } from "@/components/common/layout/gap";
</script>

<template>
    <section :class="`flex flex-row ${Gap.SMALL}`">
        <img src="/images/logo.svg" class="w-13" />
        <section class="flex flex-col p-2">
            <h2 class="text-2xl font-bold flex flex-row gap-2 items-center">
                Endurance
            </h2>

            <p class="text-medium font-semibold -mt-1">
                Strength
                <span class="underline decoration-wavy">beyond</span>
                service
            </p>
        </section>
    </section>
</template>
