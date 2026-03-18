<script setup lang="ts">
import Column from "@/components/common/layout/column.vue";
import { Gap } from "@/components/common/layout/gap";
import Pagination from "@/features/journals/components/pagination.vue";
import Boundary from "@/components/common/states/boundary.vue";
import Empty from "@/components/common/states/empty.vue";
import Loading from "@/components/common/states/loading.vue";
import Base from "@/components/layout/base.vue";
import { useJournal } from "@/features/journals/composables/use-journal";
import { getParam } from "@/lib/params";
import { useTemplateRef, watchEffect } from "vue";
import Header from "@/features/journals/components/header.vue";

const boundary = useTemplateRef<InstanceType<typeof Boundary>>("boundary");
const username: string = getParam("username");
const { journal, loading, error } = useJournal(username);
watchEffect(() => error.value && boundary.value?.capture(error.value));
</script>

<template>
    <Base>
        <Column>
            <Boundary ref="boundary">
                <Loading v-if="loading" />
                <Empty v-else-if="!journal" message="No journal found!" />

                <Column v-else :gap="Gap.EXTRA_LARGE">
                    <Header :profile="journal.profile" />
                </Column>
            </Boundary>
        </Column>
    </Base>
</template>
