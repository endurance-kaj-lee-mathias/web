<script setup lang="ts">
import Column from "@/components/common/layout/column.vue";
import Boundary from "@/components/common/states/boundary.vue";
import Loading from "@/components/common/states/loading.vue";
import { useMessages } from "@/features/messages/composables/use-messages";
import { useTemplateRef, watchEffect } from "vue";
import type { ConversationId } from "@/features/messages/models/conversation/id";
import Stack from "@/components/common/layout/stack.vue";
import { relativeDate } from "@/lib/date";
import Row from "@/components/common/layout/row.vue";
import { Justify } from "@/components/common/layout/justify";
import { Gap } from "@/components/common/layout/gap";

const props = defineProps<{ conversation: ConversationId }>();
const { messages, loading, error } = useMessages(props.conversation);
const boundary = useTemplateRef<InstanceType<typeof Boundary>>("boundary");
watchEffect(() => error.value && boundary.value?.capture(error.value));
</script>

<template>
    <Boundary ref="boundary">
        <Loading v-if="loading || !messages" />
        <Column :gap="Gap.LARGE" v-else>
            <Stack v-for="message in messages">
                <Row :justify="Justify.BETWEEN">
                    <p class="text-medium-2 text-sm max-w-sm truncate">
                        {{ message.username }}
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
    </Boundary>
</template>
