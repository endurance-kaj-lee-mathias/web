<script setup lang="ts">
import { Justify } from "@/components/common/layout/justify";
import Row from "@/components/common/layout/row.vue";

const year = new Date().getFullYear();
</script>

<template>
    <Row :justify="Justify.BETWEEN">
        <p class="text-medium">Endurance {{ year }}</p>
        <p class="text-medium-2">Support beyond service</p>
    </Row>
</template>
