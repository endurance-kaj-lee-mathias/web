<script setup lang="ts">
import { Gap } from "@/components/common/layout/gap";
import { RouterLink, useRoute } from "vue-router";
import type { ConversationId } from "@/features/messages/models/conversation-id";

const route = useRoute();
const props = defineProps<{
    id: ConversationId;
    image: string;
    username: string;
    latest?: string;
}>();

function matches(): boolean {
    return `/messages/${props.id}` === route.path;
}
</script>

<template>
    <RouterLink
        :to="`/messages/${id}`"
        :class="`grid grid-cols-[auto_1fr] ${Gap.MEDIUM} p-2 ${matches(to) ? 'bg-medium-3' : 'hover:bg-medium-3 transition-colors duration-75'}  cursor-pointer rounded-md group select-none`"
    >
        <section
            class="bg-cover bg-center min-w-10 min-h-10 w-full h-full rounded-lg bg-accent"
            :style="`background-image: url('${image}');`"
        />

        <section class="flex flex-col -space-y-0.5">
            <p class="text-medium">{{ username }}</p>
            <p class="text-medium-2 text-sm">
                {{ latest ?? "No message yet" }}
            </p>
        </section>
    </RouterLink>
</template>
