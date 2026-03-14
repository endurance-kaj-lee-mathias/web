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
import { useTemplateRef, watchEffect } from "vue";

const boundary = useTemplateRef<InstanceType<typeof Boundary>>("boundary");
const { conversations, loading, error } = useConversations();
watchEffect(() => error.value && boundary.value?.capture(error.value));
</script>

<template>
    <Base>
        <Boundary ref="boundary">
            <Loading v-if="loading || !conversations" />
            <section
                v-else
                :class="`grid sm:grid-cols-[200px_1fr] sm:h-86 h-screen ${Gap.MEDIUM}`"
            >
                <section
                    :class="`flex flex-col ${Gap.MEDIUM} overflow-y-scroll bg-medium-3 rounded-md p-2`"
                >
                    <Big :style="Style.ALTERNATE">New Chat</Big>

                    <Card
                        v-for="conversation in conversations"
                        :title="
                            getFullName(
                                conversation.firstName,
                                conversation.lastName,
                            )
                        "
                        :image="conversation.imageUrl"
                        :options="true"
                    >
                    </Card>
                </section>
                <section class="bg-medium-3 rounded-md p-2">aa</section>
            </section>
        </Boundary>
    </Base>
</template>
