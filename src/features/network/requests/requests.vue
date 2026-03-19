<script setup lang="ts">
import Base from "@/components/layout/base.vue";
import Column from "@/components/common/layout/column.vue";
import { Tabs } from "@/features/network/tabs";
import Boundary from "@/components/common/states/boundary.vue";
import Grid from "@/components/common/layout/grid.vue";
import Empty from "@/components/common/states/empty.vue";
import { ref, useTemplateRef, watchEffect } from "vue";
import Loading from "@/components/common/states/loading.vue";
import type { Request } from "@/features/network/requests/models/request";
import Details from "@/features/network/requests/components/details.vue";
import { getFullName } from "@/lib/name";
import Card from "@/components/common/card/card.vue";
import Button from "@/components/common/buttons/button.vue";
import { Gap } from "@/components/common/layout/gap";
import { useRequests } from "@/features/network/requests/composables/use-requests";
import { Size } from "@/components/common/layout/grid";
import Header from "@/features/network/components/header.vue";

const boundary = useTemplateRef<InstanceType<typeof Boundary>>("boundary");
const { requests, loading, error, fetch } = useRequests();
watchEffect(() => error.value && boundary.value?.capture(error.value));

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
            <Header />

            <Boundary ref="boundary">
                <Loading v-if="loading || !requests" />
                <Empty
                    v-else-if="requests.length <= 0"
                    message="No incoming requests found!"
                />

                <Column v-else :gap="Gap.EXTRA_LARGE">
                    <Grid :size="Size.SMALL">
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
            </Boundary>
        </Column>
    </Base>
</template>
