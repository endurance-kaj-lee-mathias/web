<script lang="ts" setup>
import { ref } from "vue";
import type { ConnectionId } from "@/features/network/models/id";
import Slots from "@/features/bookings/components/new/slots.vue";
import Network from "@/features/bookings/components/new/network.vue";
import Base from "@/components/layout/base.vue";
import Header from "@/features/bookings/components/header.vue";

const selected = ref(null as ConnectionId | null);
const slots = ref(false);

function select(id: ConnectionId) {
    selected.value = id;
    slots.value = true;
}
</script>

<template>
    <Base>
        <Header />

        <Network :select="select" />
        <Slots v-if="selected" v-model="slots" :id="selected" />
    </Base>
</template>
