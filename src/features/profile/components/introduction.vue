<script setup lang="ts">
import Column from "@/components/common/layout/column.vue";
import Empty from "@/components/common/states/empty.vue";
import { Gap } from "@/components/common/layout/gap";

defineProps<{
    username: string;
    introduction: string;
}>();
</script>

<template>
    <Column :gap="Gap.NONE">
        <h2 className="font-bold text-fg-2 text-lg">
            A little bit about @{{ username }}...
        </h2>

        <p v-if="introduction.length > 0" class="text-medium">
            {{ introduction }}
        </p>

        <Empty v-else />
    </Column>
</template>
