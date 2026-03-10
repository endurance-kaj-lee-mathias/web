<script setup lang="ts">
import Base from "@/components/layout/base.vue";
import Column from "@/components/common/layout/column.vue";
import { Tabs } from "@/features/veterans/tabs";
import Error from "@/components/common/states/error.vue";
import Row from "@/components/common/tabs/links/row.vue";
import Grid from "@/components/common/layout/grid.vue";
import Empty from "@/components/common/states/empty.vue";
import { ref, useTemplateRef } from "vue";
import Loading from "@/components/common/states/loading.vue";
import type { Request } from "@/features/veterans/requests/models/request";
import Details from "@/features/veterans/requests/components/details.vue";
import { getFullName } from "@/lib/name";
import Card from "@/components/common/card/card.vue";
import Button from "@/components/common/buttons/button.vue";
import { Gap } from "@/components/common/layout/gap";
import { useRequests } from "@/features/veterans/requests/composables/use-requests";
import { watch } from "vue";

const boundary = useTemplateRef<InstanceType<typeof Error>>("boundary");
const { requests, loading, error, fetch } = useRequests();
watch(error, (err) => err && boundary.value?.capture(err));

const request = ref(null as Request | null);
const details = ref(false);

async function read(value: Request) {
    request.value = value;
    details.value = true;
}
</script>

<template>
    <Base>
        <Column>
            <Row :tabs="Object.values(Tabs)" />

            <Error ref="boundary">
                <Loading v-if="loading || !requests" />
                <Empty
                    v-else-if="requests.length <= 0"
                    message="No incoming requests found!"
                />

                <Column v-else :gap="Gap.EXTRA_LARGE">
                    <Grid>
                        <Card
                            v-for="request in requests"
                            :title="
                                getFullName(
                                    request.sender.firstName,
                                    request.sender.lastName,
                                )
                            "
                            :image="request.sender.image"
                            :footer="true"
                            :options="true"
                        >
                            <p>@{{ request.sender.username }}</p>
                            <template v-slot:footer>
                                <Button @click="read(request)">Read</Button>
                            </template>
                        </Card>
                    </Grid>

                    <Details
                        v-if="request"
                        :request="request"
                        v-model="details"
                        @responded="fetch"
                    />
                </Column>
            </Error>
        </Column>
    </Base>
</template>
