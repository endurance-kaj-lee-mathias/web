<script setup lang="ts">
import TabHeader from "@/components/common/tabs/tab-header.vue";
import TabLink from "@/components/common/tabs/tab-link.vue";
import TabButton from "@/components/common/tabs/tab-button.vue";
import Stack from "@/components/common/layout/stack.vue";
import { Align } from "@/components/common/layout/align";
import { useRoute } from "vue-router";
import { download as downloadCalendar } from "@/features/appointments/services/appointments";

const route = useRoute();

function matches(): boolean {
    return route.path === "/appointments" || route.path === "/appointments/new";
}

async function download() {
    await downloadCalendar();
}
</script>

<template>
    <Stack :align="Align.START">
        <TabHeader>
            <TabLink href="/appointments" :active="matches()"
                >Appointments</TabLink
            >
            <TabLink href="/appointments/slots">Slots</TabLink>
            <TabButton @click="download" :active="false">Download</TabButton>
        </TabHeader>
    </Stack>
</template>
