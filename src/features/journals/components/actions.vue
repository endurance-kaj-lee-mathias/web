<script setup lang="ts">
import Small from "@/components/common/buttons/small.vue";
import { Align } from "@/components/common/layout/align";
import Row from "@/components/common/layout/row.vue";
import AppointsmentsIcon from "@/components/icons/appointments.vue";
import MessagesIcon from "@/components/icons/messages.vue";
</script>

<template>
    <Row :items="Align.CENTER" :responsive="false">
        <Small action="/messages">
            <MessagesIcon />
        </Small>

        <Small action="/appointments">
            <AppointsmentsIcon />
        </Small>
    </Row>
</template>
