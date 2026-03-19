<script setup lang="ts">
import TabHeader from "@/components/common/tabs/tab-header.vue";
import TabLink from "@/components/common/tabs/tab-link.vue";
import Stack from "@/components/common/layout/stack.vue";
import { Align } from "@/components/common/layout/align";
import { useRoute } from "vue-router";

const route = useRoute();

function matches(): boolean {
    return route.path === "/appointments" || route.path === "/appointments/new";
}
</script>

<template>
    <Stack :align="Align.START">
        <TabHeader>
            <TabLink href="/appointments" :active="matches()"
                >Appointments</TabLink
            >
            <TabLink href="/appointments/slots">Slots</TabLink>
        </TabHeader>
    </Stack>
</template>
