<script setup lang="ts">
import Column from "@/components/common/layout/column.vue";
import Boundary from "@/components/common/states/boundary.vue";
import Loading from "@/components/common/states/loading.vue";
import Base from "@/components/layout/base.vue";
import { useMessages } from "@/features/messages/composables/use-messages";
import { useTemplateRef, watchEffect } from "vue";
import type { ConversationId } from "@/features/messages/models/conversation-id";
import Empty from "@/components/common/states/empty.vue";

const props = defineProps<{ conversation: ConversationId }>();
const { messages, loading, error } = useMessages(props.conversation);
const boundary = useTemplateRef<InstanceType<typeof Boundary>>("boundary");
watchEffect(() => error.value && boundary.value?.capture(error.value));
</script>

<template>
    <Base>
        <Boundary ref="boundary">
            <Loading v-if="loading || !messages" />
            <Empty
                v-else-if="messages.length <= 0"
                message="No messages found"
            />

            <Column v-else>
                <p v-for="message in messages">
                    {{ message.content }}
                </p>
            </Column>
        </Boundary>
    </Base>
</template>
