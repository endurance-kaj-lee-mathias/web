<script setup lang="ts">
import { Gap } from "@/components/common/layout/gap";
import type { ConversationId } from "@/features/messages/models/conversation-id";
import { useConversation } from "@/features/messages/stores/conversation";
import { getFullName } from "@/lib/name";

defineProps<{
    id: ConversationId;
    image: string;
    firstName: string;
    lastName: string;
    username: string;
}>();

const store = useConversation();
</script>

<template>
    <article
        :class="`grid grid-cols-[auto_1fr] ${Gap.MEDIUM} p-2 ${store.selected === id ? 'bg-medium-3' : 'hover:bg-medium-3 transition-colors duration-75'}  cursor-pointer rounded-md group select-none`"
    >
        <section
            class="bg-cover bg-center min-w-10 min-h-10 w-full h-full rounded-lg bg-accent"
            :style="`background-image: url('${image}');`"
        />

        <section class="flex flex-col -space-y-0.5">
            <p class="text-medium">
                {{ getFullName(firstName, lastName) }}
            </p>
            <p class="text-medium-2 text-sm">
                {{ username }}
            </p>
        </section>
    </article>
</template>
