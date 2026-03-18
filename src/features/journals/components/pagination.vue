<script setup lang="ts">
import Button from "@/components/common/buttons/button.vue";
import Number from "@/components/common/inputs/number.vue";
import { Align } from "@/components/common/layout/align";
import { Gap } from "@/components/common/layout/gap";
import { Justify } from "@/components/common/layout/justify";
import Row from "@/components/common/layout/row.vue";
import Next from "@/components/icons/next.vue";
import Previous from "@/components/icons/previous.vue";
import type { Pagination } from "@/models/pagination";
import { ref, watch } from "vue";

const props = defineProps<{ pagination: Pagination }>();
const emit = defineEmits<{ (e: "update:modelValue", page: number): void }>();
const week = ref(1);

watch(week, (week) => emit("update:modelValue", week));

function next() {
    if (week.value >= props.pagination.total_pages) return;
    week.value++;
}

function previous() {
    if (week.value <= 1) return;
    week.value--;
}
</script>
<template>
    <section
        :class="`flex flex-col sm:flex-row sm:items-end justify-between ${Gap.MEDIUM}`"
    >
        <section class="w-20">
            <Number v-model="week" />
        </section>

        <Row>
            <Button @click="previous"> <Previous /> </Button>
            <Button @click="next"> <Next /> </Button>
        </Row>
    </section>
</template>
