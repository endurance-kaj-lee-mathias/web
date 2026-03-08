<script setup lang="ts">
import Base from "@/components/layout/base.vue";
import Column from "@/components/common/layout/column.vue";
import { Tabs } from "@/features/veterans/tabs";
import Error from "@/components/common/states/error.vue";
import Row from "@/components/common/tabs/links/row.vue";
import Grid from "@/components/common/layout/grid.vue";
import Empty from "@/components/common/states/empty.vue";
import { getAll } from "@/features/veterans/requests/services/requests";
import { onMounted, reactive, ref, useTemplateRef } from "vue";
import Loading from "@/components/common/states/loading.vue";
import type { Requests } from "@/features/veterans/requests/models/requests";
import Request from "./components/request.vue";
import { getFullName } from "@/lib/name";

const boundary = useTemplateRef<InstanceType<typeof Error>>("boundary");
const requests = ref(null as Requests | null);
const state = reactive({
    loading: false,
});

onMounted(async () => await fetch());

async function fetch() {
    state.loading = true;
    requests.value = await getAll();
    state.loading = false;
}
</script>

<template>
    <Base>
        <Column>
            <Row :tabs="Object.values(Tabs)" />

            <Error ref="boundary">
                <Loading v-if="!requests" />
                <Empty
                    v-else-if="requests.outgoing.length <= 0"
                    message="No incoming requests found!"
                />

                <Grid v-else>
                    <Request
                        v-for="request in requests.outgoing"
                        :name="
                            getFullName(
                                request.sender.firstName,
                                request.sender.lastName,
                            )
                        "
                        :username="request.sender.username"
                        image=""
                    />
                </Grid>
            </Error>
        </Column>
    </Base>
</template>
