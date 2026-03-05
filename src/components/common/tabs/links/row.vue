<script setup lang="ts">
import Row from "@/components/common/layout/row.vue";
import Link from "@/components/common/tabs/links/link.vue";
import type { Tab } from "@/components/common/tabs/links/tab";

defineProps<{
    tabs: Tab[];
}>();
</script>

<template>
    <Row :responsive="false" :wrap="true">
        <Link v-for="tab in tabs" :title="tab.title" :href="tab.href" />
    </Row>
</template>
