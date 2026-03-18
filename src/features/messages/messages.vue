<script setup lang="ts">
import { Style } from "@/components/common/buttons/style";
import Column from "@/components/common/layout/column.vue";
import { Gap } from "@/components/common/layout/gap";
import Boundary from "@/components/common/states/boundary.vue";
import Loading from "@/components/common/states/loading.vue";
import Base from "@/components/layout/base.vue";
import { useConversations } from "@/features/messages/composables/use-conversations";
import { send as sendMessage } from "@/features/messages/services/messages";
import { ref } from "vue";
import { useTemplateRef, watchEffect } from "vue";
import Network from "@/features/messages/components/network.vue";
import Conversation from "@/features/messages/components/conversation.vue";
import Messages from "@/features/messages/components/messages.vue";
import Empty from "@/components/common/states/empty.vue";
import Button from "@/components/common/buttons/button.vue";
import Send from "@/features/messages/components/send.vue";
import AddIcon from "@/components/icons/add.vue";
import { useConversation } from "@/features/messages/stores/conversation";

const { conversations, loading, error } = useConversations();
const boundary = useTemplateRef<InstanceType<typeof Boundary>>("boundary");
watchEffect(() => error.value && boundary.value?.capture(error.value));
const network = ref(false);
const store = useConversation();

async function send(message: string) {
    if (!store.selected || message.length <= 0) return;

    try {
        await sendMessage(store.selected, message);
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
                    :class="`grid sm:grid-cols-[200px_1fr] sm:h-86 h-screen ${Gap.MEDIUM} overflow-hidden`"
                >
                    <section
                        :class="`flex flex-col ${Gap.MEDIUM} overflow-y-scroll no-scrollbar`"
                    >
                        <Button :style="Style.DEFAULT" @click="network = true">
                            <AddIcon /> Conversation
                        </Button>

                        <Conversation
                            v-for="conversation in conversations"
                            :id="conversation.id"
                            :firstName="conversation.firstName"
                            :lastName="conversation.lastName"
                            :username="conversation.username"
                            :image="conversation.image"
                            @click="store.select(conversation.id)"
                        />
                    </section>

                    <section
                        :class="`flex flex-col ${Gap.MEDIUM} h-full min-h-0`"
                    >
                        <section
                            class="bg-medium-3 rounded-md p-2 h-full min-h-0 overflow-y-scroll"
                        >
                            <Empty
                                v-if="!store.selected"
                                message="No conversation selected"
                            />

                            <Messages v-else :conversation="store.selected" />
                        </section>

                        <Send :send="send" />
                    </section>
                </section>
            </Column>
        </Boundary>
    </Base>
</template>
