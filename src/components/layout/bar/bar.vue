<script setup lang="ts">
import Column from "@/components/common/layout/column.vue";
import Account from "@/components/layout/bar/account.vue";
import Header from "@/components/layout/bar/header.vue";
import Link from "@/components/layout/bar/link.vue";
import { ref } from "vue";
import { Gap } from "@/components/common/layout/gap";
import { getVisibleRoutes } from "@/router/routes";

const state = ref(true);
</script>

<template>
    <section
        v-if="state"
        class="sm:hidden fixed inset-0 bg-black/50 z-40"
        @click="state = false"
    ></section>

    <aside
        :class="[
            'fixed sm:relative flex flex-col justify-between gap-2 bg-light-2 border-r-2 border-medium-3 px-3 py-2 h-full',
            'transition-all duration-300 overflow-hidden z-50',
            'w-[90%] sm:min-w-fit sm:max-w-50',
            state ? 'left-0' : '-left-full sm:left-0',
        ]"
    >
        <Column :gap="Gap.LARGE">
            <Header />

            <Column>
                <Link v-for="route in getVisibleRoutes()" :href="route.path">
                    <Component :is="route.icon" />
                    {{ route.title }}
                </Link>
            </Column>
        </Column>

        <Account />
    </aside>
</template>
