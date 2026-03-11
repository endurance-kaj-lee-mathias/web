<script setup lang="ts">
import Box from "@/components/common/inputs/box.vue";
import Input from "@/components/common/inputs/input.vue";
import Column from "@/components/common/layout/column.vue";
import { useComputedField } from "@/features/profile/components/preferences/compute";
import type { About as AboutModel } from "@/features/profile/models/about";

const props = defineProps<{ values: AboutModel }>();
const emit = defineEmits<{ (e: "update:values", value: AboutModel): void }>();

const about = useComputedField(props, emit, "about");
const introduction = useComputedField(props, emit, "introduction");
</script>

<template>
    <Column>
        <Input
            v-model="about"
            label="About"
            placeholder="Hello!"
            :required="true"
        />
        <Box
            v-model="introduction"
            label="Introduction"
            placeholder="Tell us a little bit about yourself!"
            :required="true"
        />
    </Column>
</template>
