<script setup lang="ts">
import Row from "@/components/common/layout/row.vue";
import Button from "@/components/common/tabs/button.vue";

defineProps<{
    titles: string[];
    current: string;
    navigate: (title: string) => void;
}>();
</script>

<template>
    <Row :responsive="false" :wrap="true">
        <Button
            v-for="title in titles"
            :title="title"
            :active="current === title"
            :navigate="() => navigate(title)"
        />
    </Row>
</template>
