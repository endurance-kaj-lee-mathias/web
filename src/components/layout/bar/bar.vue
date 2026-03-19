<script setup lang="ts">
import Row from "@/components/common/layout/row.vue";
import { Gap } from "@/components/common/layout/gap";
import { getRoutes } from "@/router/routes/routes";
import { Justify } from "@/components/common/layout/justify";
import Link from "@/components/layout/bar/link.vue";
import { Visibility } from "@/router/route";
import Button from "@/components/layout/bar/button.vue";
import Small from "@/components/common/buttons/small.vue";
import { ref } from "vue";
import MenuIcon from "@/components/icons/menu.vue";
import Menu from "@/components/layout/bar/menu.vue";

const menu = ref(false);
const open = () => (menu.value = true);
const close = () => (menu.value = false);
</script>

<template>
    <Row :gap="Gap.LARGE" :justify="Justify.BETWEEN">
        <section
            class="flex flex-row gap-2 justify-between w-full items-center md:hidden"
        >
            <RouterLink to="/">
                <h2 className="text-xl font-bold">Endurance</h2>
            </RouterLink>

            <Small :action="open">
                <MenuIcon />
            </Small>
        </section>

        <section class="hidden md:flex">
            <Row :gap="Gap.LARGE" :wrap="true">
                <Link
                    v-for="route in getRoutes(Visibility.BAR)"
                    :href="route.path"
                >
                    <component v-if="route.icon" :is="route.icon" />
                    {{ route.title ?? "Route" }}
                </Link>
            </Row>
        </section>

        <section className="hidden md:flex">
            <Row :wrap="true">
                <Button
                    v-for="route in getRoutes(Visibility.ICON)"
                    :href="route.path"
                >
                    <component v-if="route.icon" :is="route.icon" />
                </Button>
            </Row>
        </section>
    </Row>

    <Menu :state="menu" :close="close" />
</template>
