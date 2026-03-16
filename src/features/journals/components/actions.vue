<script setup lang="ts">
import Small from "@/components/common/buttons/small.vue";
import { Align } from "@/components/common/layout/align";
import { Gap } from "@/components/common/layout/gap";
import Row from "@/components/common/layout/row.vue";
import MessagesIcon from "@/components/icons/messages.vue";
import BookingsIcon from "@/components/icons/bookings.vue";
</script>

<template>
    <Row :gap="Gap.SMALL" :items="Align.CENTER" :responsive="false">
        <Small action="/messages">
            <MessagesIcon />
        </Small>

        <Small action="/bookings">
            <BookingsIcon />
        </Small>
    </Row>
</template>
