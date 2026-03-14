<script setup lang="ts">
import Big from "@/components/common/buttons/big.vue";
import { Style } from "@/components/common/buttons/style";
import Card from "@/components/common/card/card.vue";
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
import Conversation from "./components/conversation.vue";

const boundary = useTemplateRef<InstanceType<typeof Boundary>>("boundary");
const { conversations, loading, error } = useConversations();
watchEffect(() => error.value && boundary.value?.capture(error.value));
const network = ref(false);
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
                        :class="`flex flex-col ${Gap.MEDIUM} overflow-y-scroll`"
                    >
                        <Conversation
                            v-for="conversation in conversations"
                            :username="
                                getFullName(
                                    conversation.firstName,
                                    conversation.lastName,
                                )
                            "
                            :image="conversation.imageUrl"
                        />

                        <Big :style="Style.DEFAULT" @click="network = true">
                            New Chat
                        </Big>
                    </section>
                    <section class="bg-medium-3 rounded-md p-2">aa</section>
                </section>
            </Column>
        </Boundary>
    </Base>
</template>
