<script setup lang="ts">
import Column from "@/components/common/layout/column.vue";
import { Gap } from "@/components/common/layout/gap";
import Dynamic from "@/components/common/images/dynamic.vue";

defineProps<{
    image: string;
    username: string;
    latest?: string;
}>();
</script>

<template>
    <article
        :class="`grid grid-cols-[auto_1fr] ${Gap.MEDIUM} p-2 bg-medium-3 hover:bg-accent transition-colors duration-75 cursor-pointer rounded-md group select-none`"
    >
        <section
            class="bg-cover bg-center min-w-10 min-h-10 w-full h-full rounded-lg bg-accent"
            :style="`background-image: url('${image}');`"
        />

        <section class="flex flex-col -space-y-0.5">
            <p class="text-medium group-hover:text-light-2">{{ username }}</p>
            <p class="text-medium-2 group-hover:text-light-2 text-sm">
                {{ latest ?? "No message yet" }}
            </p>
        </section>
    </article>
</template>
