<script setup lang="ts">
import TabHeader from "@/components/common/tabs/tab-header.vue";
import TabLink from "@/components/common/tabs/tab-link.vue";
import Stack from "@/components/common/layout/stack.vue";
import { Align } from "@/components/common/layout/align";
import { hasRoles } from "@/services/authentication";
import { Role } from "@/models/roles";
</script>

<template>
    <Stack :align="Align.START">
        <TabHeader>
            <TabLink href="/bookings">Appointments</TabLink>
            <TabLink v-if="hasRoles([Role.VETERAN])" href="/bookings/new"
                >New Appointment</TabLink
            >
            <TabLink href="/bookings/slots">Available Slots</TabLink>
        </TabHeader>
    </Stack>
</template>
