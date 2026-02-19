<script lang="ts" setup>
import { Gap } from "@/components/common/layout/gap";
import { Align } from "@/components/common/layout/align";
import Switcher from "@/components/icons/switcher.vue";
import { Justify } from "@/components/common/layout/justify";
import { RouterLink, useRoute } from "vue-router";
import { useKeycloak } from "@josempgon/vue-keycloak";
import { computed } from "vue";

const route = useRoute();
const { username, decodedToken } = useKeycloak();
const email = computed(() => decodedToken.value.email ?? "");

function matches(): boolean {
    return route.path === "/account";
}
</script>

<template>
    <RouterLink
        to="/account"
        :class="`px-3 py-2.5 flex flex-row ${Gap.SMALL} ${Align.CENTER} ${Justify.BETWEEN} rounded-lg transition-colors duration-100 cursor-pointer select-none ${matches() ? 'bg-medium-3' : 'hover:bg-medium-3'}`"
    >
        <section :class="`flex flex-row ${Gap.MEDIUM}`">
            <img src="/images/logo.svg" class="w-9" />

            <section class="flex flex-col">
                <h2 class="font-bold flex flex-row gap-2 items-center">
                    {{ username }}
                </h2>

                <p class="text-xs text-medium font-semibold -mt-1">
                    {{ email }}
                </p>
            </section>
        </section>

        <section class="text-medium-2">
            <Switcher />
        </section>
    </RouterLink>
</template>
