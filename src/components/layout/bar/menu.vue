<script lang="ts" setup>
import CloseIcon from "@/components/icons/close.vue";
import Small from "@/components/common/buttons/small.vue";
import Link from "@/components/layout/bar/link.vue";
import { getRoutes } from "@/router/routes/routes";
import { Visibility } from "@/router/route";

defineProps<{ state: boolean; close: () => void }>();
</script>

<template>
    <section v-if="state" class="fixed inset-0 bg-black/50 z-40 md:hidden" />

    <aside
        :class="`
        fixed top-0 left-0 h-full w-64 bg-light z-50 transform transition-transform duration-300 ease-in-out md:hidden
        ${state ? 'translate-x-0' : '-translate-x-full'}`"
    >
        <section
            class="p-4 border-b-2 border-light-2 flex items-center justify-between"
        >
            <h2 class="text-xl font-bold">Endurance</h2>

            <Small :action="close">
                <CloseIcon />
            </Small>
        </section>

        <section class="flex flex-col gap-4 p-4 border-b-2 border-light-2">
            <Link v-for="route in getRoutes(Visibility.BAR)" :href="route.path">
                <component :is="route.icon" />
                {{ route.title }}
            </Link>
        </section>

        <section class="flex flex-col gap-4 p-4">
            <Link
                v-for="route in getRoutes(Visibility.ICON)"
                :href="route.path"
            >
                <component :is="route.icon" />
                {{ route.title }}
            </Link>
        </section>
    </aside>
</template>
