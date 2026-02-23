<script setup lang="ts">
import Row from "@/components/common/layout/row.vue";
import { Gap } from "@/components/common/layout/gap";
import { getRoutesBasedOnVisibility } from "@/router/routes/routes";
import { Justify } from "@/components/common/layout/justify";
import Link from "@/components/layout/bar/link.vue";
import { Visibility } from "@/router/route";
</script>

<template>
    <Row :gap="Gap.LARGE" :justify="Justify.BETWEEN">
        <section
            class="flex flex-row gap-2 mt-4 justify-between w-full items-center md:hidden"
        >
            <RouterLink to="/">
                <h2 className="text-lg font-semibold">Moko</h2>
            </RouterLink>
        </section>

        <section class="hidden md:flex">
            <Row :gap="Gap.LARGE" :wrap="true">
                <Link
                    v-for="route in getRoutesBasedOnVisibility(Visibility.BAR)"
                    :href="route.path"
                >
                    <component :is="route.icon" />
                    {{ route.title ?? "Route" }}
                </Link>
            </Row>
        </section>
    </Row>
</template>
