<script setup lang="ts">
import Box from "@/components/common/inputs/box.vue";
import Input from "@/components/common/inputs/input.vue";
import Column from "@/components/common/layout/column.vue";
import { computed } from "vue";

const props = defineProps<{
    values: { about: string; introduction: string };
}>();

const emit = defineEmits<{
    (e: "update:values", value: typeof props.values): void;
}>();

const about = computed({
    get: () => props.values.about,
    set: (val: string) =>
        emit("update:values", {
            ...props.values,
            about: val,
        }),
});

const introduction = computed({
    get: () => props.values.introduction,
    set: (val: string) =>
        emit("update:values", {
            ...props.values,
            introduction: val,
        }),
});
</script>

<template>
    <Column>
        <Input v-model="about" label="About" />
        <Box v-model="introduction" label="Introduction" />
    </Column>
</template>
