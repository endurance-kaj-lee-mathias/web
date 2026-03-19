<script setup lang="ts">
import Column from "@/components/common/layout/column.vue";
import Boundary from "@/components/common/states/boundary.vue";
import Empty from "@/components/common/states/empty.vue";
import Loading from "@/components/common/states/loading.vue";
import Base from "@/components/layout/base.vue";
import { useJournal } from "@/features/journals/composables/use-journal";
import { ref, useTemplateRef, watchEffect } from "vue";
import { getParam } from "@/lib/params";
import Bar from "@/features/journals/components/bar.vue";
import Pagination from "@/features/journals/components/pagination.vue";
import { Justify } from "@/components/common/layout/justify";
import { Align } from "@/components/common/layout/align";
import Details from "@/features/journals/components/details.vue";
import Information from "@/features/journals/components/information.vue";
import type { Day } from "@/features/journals/models/journal/day";
import { getFullName } from "@/lib/name";

const boundary = useTemplateRef<InstanceType<typeof Boundary>>("boundary");
const username: string = getParam("username");
const week = ref(0);

const { journal, loading, error } = useJournal(username, () => week.value);
watchEffect(() => error.value && boundary.value?.capture(error.value));

const details = ref(false);
const day = ref(null as Day | null);

function select(value: Day) {
    if (details.value) return;
    day.value = value;
    details.value = true;
}
</script>

<template>
    <Base>
        <Column>
            <Boundary ref="boundary">
                <Loading v-if="loading" />
                <Empty v-else-if="!journal" message="No journal found!" />

                <Column v-else>
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

                    <Pagination
                        :max="journal.weekly.totalWeeks"
                        v-model="week"
                    />

                    <section
                        v-if="
                            !journal.weekly ||
                            !journal.weekly.days ||
                            journal.weekly.days.length <= 0
                        "
                        :class="`bg-light-2 shadow-sm rounded-lg p-1 min-h-96 flex ${Justify.CENTER} ${Align.CENTER}`"
                    >
                        <Empty message="No data found" />
                    </section>

                    <Column v-else>
                        <section class="bg-light-2 shadow-sm rounded-lg p-2">
                            <Bar
                                :entries="journal.weekly.days"
                                :select="select"
                            />
                        </section>

                        <Details v-model="details" v-if="day" :day="day" />
                    </Column>
                </Column>
            </Boundary>
        </Column>
    </Base>
</template>
