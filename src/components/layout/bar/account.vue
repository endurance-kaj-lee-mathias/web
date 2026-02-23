<script lang="ts" setup>
import { Gap } from "@/components/common/layout/gap";
import { Align } from "@/components/common/layout/align";
import { Justify } from "@/components/common/layout/justify";
import { RouterLink, useRoute } from "vue-router";
import { getRandomImage } from "@/services/account";
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
        :class="`px-3 py-2.5 flex flex-row ${Gap.MEDIUM} ${Align.CENTER} rounded-lg transition-colors duration-100 cursor-pointer select-none ${matches() ? 'bg-medium-3' : 'hover:bg-medium-3'}`"
    >
        <img :src="getRandomImage()" class="w-11 rounded-lg" />

        <section class="flex flex-col min-w-0">
            <h2 class="text-lg font-bold truncate">
                {{ username }}
            </h2>

            <p class="text-xs text-medium font-semibold -mt-1 truncate">
                {{ email }}
            </p>
        </section>
    </RouterLink>
</template>
