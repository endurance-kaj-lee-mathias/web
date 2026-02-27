<script setup lang="ts">
import Box from "@/components/common/inputs/box.vue";
import Input from "@/components/common/inputs/input.vue";
import Column from "@/components/common/layout/column.vue";
import { useComputedField } from "@/features/profile/components/preferences/compute";

type Values = {
    about: string;
    introduction: string;
};

const props = defineProps<{ values: Values }>();
const emit = defineEmits<{ (e: "update:values", value: Values): void }>();

const about = useComputedField<string, Values>(props, emit, "about");
const introduction = useComputedField<string, Values>(
    props,
    emit,
    "introduction",
);
</script>

<template>
    <Column>
        <Input v-model="about" label="About" />
        <Box v-model="introduction" label="Introduction" />
    </Column>
</template>
