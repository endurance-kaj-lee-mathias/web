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
import Link from "@/components/common/link.vue";
import BackIcon from "@/components/icons/back.vue";
import Small from "@/components/common/buttons/small.vue";
import Row from "@/components/common/layout/row.vue";
import Introduction from "../profile/components/introduction.vue";
import { Gap } from "@/components/common/layout/gap";

const boundary = useTemplateRef<InstanceType<typeof Boundary>>("boundary");
const username: string = getParam("username");
const { journal, loading, error } = useJournal(username);
watchEffect(() => error.value && boundary.value?.capture(error.value));
</script>

<template>
    <Base>
        <Column>
            <Row>
                <Small action="/journals">
                    <Row> <BackIcon /> Back To Journals</Row>
                </Small>
            </Row>

            <Boundary ref="boundary">
                <Loading v-if="loading" />
                <Empty v-else-if="!journal" message="No journal found!" />

                <Column v-else :gap="Gap.EXTRA_LARGE">
                    <Information
                        :name="
                            getFullName(
                                journal.userProfile.firstName,
                                journal.userProfile.lastName,
                            )
                        "
                        :username="journal.userProfile.username"
                        :about="journal.userProfile.about"
                        :image="journal.userProfile.image"
                    />

                    <Introduction
                        :username="journal.userProfile.username"
                        :introduction="journal.userProfile.introduction"
                    />
                </Column>
            </Boundary>
        </Column>
    </Base>
</template>
