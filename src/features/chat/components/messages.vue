<script setup lang="ts">
import Column from "@/components/common/layout/column.vue";
import Boundary from "@/components/common/states/boundary.vue";
import Loading from "@/components/common/states/loading.vue";
<<<<<<< HEAD:src/features/chat/components/messages.vue
import { useMessages } from "@/features/chat/composables/use-messages";
import { useTemplateRef, watchEffect } from "vue";
import type { ConversationId } from "@/features/chat/models/conversation/id";
=======
import { useMessages } from "@/features/messages/composables/use-messages";
import { nextTick, useTemplateRef, watchEffect } from "vue";
import type { ConversationId } from "@/features/messages/models/conversation/id";
>>>>>>> origin/main:src/features/messages/components/messages.vue
import Stack from "@/components/common/layout/stack.vue";
import { relativeDate } from "@/lib/date";
import Row from "@/components/common/layout/row.vue";
import { Justify } from "@/components/common/layout/justify";
import { Gap } from "@/components/common/layout/gap";
import { ref } from "vue";
import { watch } from "vue";

const props = defineProps<{ conversation: ConversationId }>();
const { messages, loading, error } = useMessages(props.conversation);
const boundary = useTemplateRef<InstanceType<typeof Boundary>>("boundary");
watchEffect(() => error.value && boundary.value?.capture(error.value));

const container = useTemplateRef<HTMLDivElement>("container");
const initialized = ref(false);

watch(
    () => props.conversation,
    () => (initialized.value = false),
);

watchEffect(() => {
    if (!messages.value) return;
    const scrollable = container.value?.closest(".overflow-y-scroll");

    const distance = scrollable
        ? scrollable.scrollHeight -
          scrollable.scrollTop -
          scrollable.clientHeight
        : Infinity;

    nextTick(() => {
        if (!scrollable || (initialized.value && distance >= 250)) return;

        scrollable.scrollTop = scrollable.scrollHeight;
        initialized.value = true;
    });
});
</script>

<template>
    <Boundary ref="boundary">
        <Loading v-if="loading || !messages" />
        <section ref="container" v-else>
            <Column :gap="Gap.LARGE">
                <Stack v-for="message in messages">
                    <Row :justify="Justify.BETWEEN">
                        <p class="text-medium-2 text-sm max-w-sm truncate">
                            {{ message.username ?? "Unknown" }}
                        </p>
                        <p class="text-medium-2 text-sm">
                            {{ relativeDate(message.createdAt) }}
                        </p>
                    </Row>

                    <p class="text-medium">
                        {{ message.content }}
                    </p>
                </Stack>
            </Column>
        </section>
    </Boundary>
</template>
