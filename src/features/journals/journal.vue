<script setup lang="ts">
import Column from "@/components/common/layout/column.vue";
import Boundary from "@/components/common/states/boundary.vue";
import Empty from "@/components/common/states/empty.vue";
import Loading from "@/components/common/states/loading.vue";
import Base from "@/components/layout/base.vue";
import { useJournal } from "@/features/journals/composables/use-journal";
import { useTemplateRef, watchEffect } from "vue";
import Information from "@/features/journals/components/information.vue";
import { getParam } from "@/lib/params";
import { getFullName } from "@/lib/name";
import BackIcon from "@/components/icons/back.vue";
import Small from "@/components/common/buttons/small.vue";
import TabLink from "@/components/common/tabs/links/link.vue";
import TabRow from "@/components/common/tabs/links/row.vue";
import Introduction from "@/features/journals/components/introduction.vue";
import { Gap } from "@/components/common/layout/gap";
import { getTabs } from "@/features/journals/tabs";
import Row from "@/components/common/layout/row.vue";
import { Align } from "@/components/common/layout/align";

const boundary = useTemplateRef<InstanceType<typeof Boundary>>("boundary");
const username: string = getParam("username");
const { journal, loading, error } = useJournal(username);
watchEffect(() => error.value && boundary.value?.capture(error.value));
</script>

<template>
    <Base>
        <Column>
            <TabRow :tabs="Object.values(getTabs(username))" />

            <Boundary ref="boundary">
                <Loading v-if="loading" />
                <Empty v-else-if="!journal" message="No journal found!" />

                <Column v-else :gap="Gap.EXTRA_LARGE">
                    <Information
                        :name="
                            getFullName(
                                journal.profile.firstName,
                                journal.profile.lastName,
                            )
                        "
                        :username="journal.profile.username"
                        :about="journal.profile.about"
                        :image="journal.profile.image"
                    />

                    <Introduction
                        :username="journal.profile.username"
                        :introduction="journal.profile.introduction"
                    />
                </Column>
            </Boundary>
        </Column>
    </Base>
</template>
