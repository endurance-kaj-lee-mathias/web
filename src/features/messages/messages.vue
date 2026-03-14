<script setup lang="ts">
import Big from "@/components/common/buttons/big.vue";
import { Style } from "@/components/common/buttons/style";
import Column from "@/components/common/layout/column.vue";
import { Gap } from "@/components/common/layout/gap";
import Boundary from "@/components/common/states/boundary.vue";
import Loading from "@/components/common/states/loading.vue";
import Base from "@/components/layout/base.vue";
import { useConversations } from "@/features/messages/composables/use-conversations";
import { getFullName } from "@/lib/name";
import { ref } from "vue";
import { useTemplateRef, watchEffect } from "vue";
import Network from "@/features/messages/components/network.vue";
import Conversation from "@/features/messages/components/conversation.vue";
import Messages from "@/features/messages/components/messages.vue";
import type { ConversationId } from "@/features/messages/models/conversation-id";
import Empty from "@/components/common/states/empty.vue";
import Button from "@/components/common/buttons/button.vue";

const { conversations, loading, error } = useConversations();
const boundary = useTemplateRef<InstanceType<typeof Boundary>>("boundary");
watchEffect(() => error.value && boundary.value?.capture(error.value));
const network = ref(false);
const selected = ref(null as ConversationId | null);

async function select(id: ConversationId) {
    try {
        selected.value = id;
    } catch (error: unknown) {
        boundary.value!.error = error as Error;
    }
}
</script>

<template>
    <Base>
        <Boundary ref="boundary">
            <Loading v-if="loading || !conversations" />
            <Column v-else>
                <Network v-model="network" />

                <section
                    :class="`grid sm:grid-cols-[200px_1fr] sm:h-86 h-screen ${Gap.MEDIUM}`"
                >
                    <section
                        :class="`flex flex-col ${Gap.MEDIUM} overflow-y-scroll no-scrollbar`"
                    >
                        <Button :style="Style.DEFAULT" @click="network = true">
                            New Chat
                        </Button>

                        <Conversation
                            v-for="conversation in conversations"
                            :id="conversation.id"
                            :username="
                                getFullName(
                                    conversation.firstName,
                                    conversation.lastName,
                                )
                            "
                            :image="conversation.imageUrl"
                        />
                    </section>
                    <section class="bg-medium-3 rounded-md p-2">
                        <Empty
                            v-if="!selected"
                            message="No conversation selected"
                        />
                        <Messages v-else :conversation="selected" />
                    </section>
                </section>
            </Column>
        </Boundary>
    </Base>
</template>
