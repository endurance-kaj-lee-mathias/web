<script setup lang="ts">
import { Gap } from "@/components/common/layout/gap";
import type { ConversationId } from "@/features/chat/models/conversation/id";
import { useConversation } from "@/features/chat/stores/conversation";
import { getFullName } from "@/lib/name";
import { computed } from "vue";

const props = defineProps<{
    id: ConversationId;
    image: string;
    firstName: string;
    lastName: string;
    username: string;
}>();

const store = useConversation();
const active = computed(() => store.selected === props.id);
</script>

<template>
    <article
        :class="`grid grid-cols-[auto_1fr] ${Gap.MEDIUM} p-2 ${active ? 'bg-accent text-light' : 'bg-light-2 hover:bg-accent hover:text-light'} cursor-pointer transition-colors duration-75 rounded-md group select-none`"
    >
        <section
            class="bg-cover shadow-sm bg-center min-w-10 min-h-10 w-full h-full rounded-lg bg-accent"
            :style="`background-image: url('${image}');`"
        />

        <section class="flex flex-col -space-y-0.5">
            <p>{{ getFullName(firstName, lastName) }}</p>
            <p
                :class="`text-sm ${active ? 'text-light' : 'text-medium group-hover:text-light transition-colors duration-75'}`"
            >
                @{{ username }}
            </p>
        </section>
    </article>
</template>
