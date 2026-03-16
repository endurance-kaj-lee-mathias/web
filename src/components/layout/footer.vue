<script setup lang="ts">
import Card from "@/components/common/card/card.vue";
import Column from "@/components/common/layout/column.vue";
import { Size } from "@/components/common/layout/grid";
import Grid from "@/components/common/layout/grid.vue";
import Boundary from "@/components/common/states/boundary.vue";
import Empty from "@/components/common/states/empty.vue";
import Loading from "@/components/common/states/loading.vue";
import Base from "@/components/layout/base.vue";
import { useVeterans } from "@/features/journals/composables/use-veterans";
import { getFullName } from "@/lib/name";
import { useTemplateRef, watchEffect } from "vue";
import { Height } from "@/components/common/layout/height";
import { Justify } from "@/components/common/layout/justify";
import SmileIcon from "@/components/icons/smile.vue";
import ClockIcon from "@/components/icons/clock.vue";
import Row from "@/components/common/layout/row.vue";
import Link from "@/components/common/link.vue";

const year = new Date().getFullYear();
</script>

<template>
    <Row :justify="Justify.BETWEEN">
        <Link action="/">Endurance {{ year }}</Link>
        <p class="text-medium">Support beyond service</p>
    </Row>
</template>
