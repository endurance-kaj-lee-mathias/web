<script setup lang="ts">
import Column from "@/components/common/layout/column.vue";
import Boundary from "@/components/common/states/boundary.vue";
import Empty from "@/components/common/states/empty.vue";
import Loading from "@/components/common/states/loading.vue";
import Base from "@/components/layout/base.vue";
import { useJournal } from "@/features/journals/composables/use-journal";
import { ref, useTemplateRef, watchEffect } from "vue";
import { getParam } from "@/lib/params";
import { Gap } from "@/components/common/layout/gap";
import Header from "@/features/journals/components/header.vue";
import Bar from "@/features/journals/components/bar.vue";
import Pagination from "@/features/journals/components/pagination.vue";
import { Justify } from "@/components/common/layout/justify";
import { Align } from "@/components/common/layout/align";

const boundary = useTemplateRef<InstanceType<typeof Boundary>>("boundary");
const username: string = getParam("username");
const { journal, loading, error } = useJournal(username);
const page = ref(1);
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

                    <section
                        v-if="
                            !journal.moodEntries ||
                            journal.moodEntries.data.length <= 0
                        "
                        :class="`bg-light-2 shadow-sm rounded-lg p-1 min-h-64 flex ${Justify.CENTER} ${Align.CENTER}`"
                    >
                        <Empty message="No mood data found" />
                    </section>

                    <Column v-else>
                        <Pagination
                            :pagination="journal.moodEntries.pagination"
                            v-model="page"
                        />

                        <section
                            class="bg-light-2 shadow-sm rounded-lg p-2 min-h-64"
                        >
                            <Bar
                                :entries="journal.moodEntries.data"
                                :select="
                                    (date: Date) => {
                                        console.log(date);
                                    }
                                "
                            />
                        </section>
                    </Column>
                </Column>
            </Boundary>
        </Column>
    </Base>
</template>
