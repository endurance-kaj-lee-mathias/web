<script setup lang="ts">
import Row from "@/components/common/layout/row.vue";
import { Justify } from "@/components/common/layout/justify";
import Number from "@/components/common/inputs/number.vue";
import Button from "@/components/common/buttons/button.vue";
import Previous from "@/components/icons/previous.vue";
import Next from "@/components/icons/next.vue";
import { ref } from "vue";
import type { Pagination } from "@/models/pagination";

const props = defineProps<{ pagination: Pagination }>();
const page = ref(1);

function next() {
    if (page.value >= props.pagination.total_pages) return;
    page.value++;
}

function previous() {
    if (page.value <= 1) return;
    page.value--;
}
</script>

<template>
    <Row :justify="Justify.BETWEEN">
        <section class="w-20">
            <Number v-model="page" />
        </section>

        <Row>
            <Button @click="previous"> <Previous /> </Button>
            <Button @click="next"> <Next /> </Button>
        </Row>
    </Row>
</template>
