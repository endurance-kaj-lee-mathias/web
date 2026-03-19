<script lang="ts" setup>
import Column from "@/components/common/layout/column.vue";
import Loading from "@/components/common/states/loading.vue";
import Boundary from "@/components/common/states/boundary.vue";
import { useTemplateRef } from "vue";
import { watchEffect } from "vue";
import Empty from "@/components/common/states/empty.vue";
import { useConnections } from "@/features/network/connections/composables/use-connections";
import Card from "@/components/common/card/card.vue";
import { getFullName } from "@/lib/name";
import Grid from "@/components/common/layout/grid.vue";
import Small from "@/components/common/buttons/small.vue";
import { Size } from "@/components/common/layout/grid";
import { SmallStyle } from "@/components/common/buttons/style";
import BookingsIcon from "@/components/icons/appointments.vue";
import type { ConnectionId } from "@/features/network/models/id";

defineProps<{ select: (id: ConnectionId) => void }>();
const boundary = useTemplateRef<InstanceType<typeof Boundary>>("boundary");
const { connections, loading, error } = useConnections();
watchEffect(() => error.value && boundary.value?.capture(error.value));
</script>

<template>
    <Boundary ref="boundary">
        <Column>
            <Loading v-if="loading || !connections" />

            <Column v-else>
                <Empty
                    v-if="connections.length <= 0"
                    message="No connections in network found"
                />

                <Grid :size="Size.SMALL" v-else>
                    <Card
                        v-for="connection in connections"
                        :title="
                            getFullName(
                                connection.firstName,
                                connection.lastName,
                            )
                        "
                        :image="connection.image"
                        :options="true"
                    >
                        <p>@{{ connection.username }}</p>

                        <template v-slot:options>
                            <Small
                                :action="() => select(connection.id)"
                                :style="SmallStyle.ALTERNATE"
                            >
                                <BookingsIcon />
                            </Small>
                        </template>
                    </Card>
                </Grid>
            </Column>
        </Column>
    </Boundary>
</template>
