<script setup lang="ts">
import TabHeader from "@/components/common/tabs/links/tab-header.vue";
import TabLink from "@/components/common/tabs/links/tab-link.vue";
import Stack from "@/components/common/layout/stack.vue";
import { Align } from "@/components/common/layout/align";
</script>

<template>
    <Stack :align="Align.START">
        <TabHeader>
            <TabLink href="/network/connections">Connections</TabLink>
            <TabLink href="/network/requests">Requests</TabLink>
        </TabHeader>
    </Stack>
</template>
