<script setup lang="ts">
import Card from "@/components/common/card/card.vue";
import Column from "@/components/common/layout/column.vue";
import { Size } from "@/components/common/layout/grid";
import Grid from "@/components/common/layout/grid.vue";
import Boundary from "@/components/common/states/boundary.vue";
import Empty from "@/components/common/states/empty.vue";
import Loading from "@/components/common/states/loading.vue";
import Base from "@/components/layout/base.vue";
import { useVeterans } from "@/features/journals/composables/use-veterans";
import { getFullName } from "@/lib/name";
import { useTemplateRef, watchEffect } from "vue";
import { Height } from "@/components/common/layout/height";
import SmileIcon from "@/components/icons/smile.vue";
import ClockIcon from "@/components/icons/clock.vue";
import Row from "@/components/common/layout/row.vue";

const boundary = useTemplateRef<InstanceType<typeof Boundary>>("boundary");
const { veterans, loading, error, fetch } = useVeterans();
watchEffect(() => error.value && boundary.value?.capture(error.value));
</script>

<template>
    <Base>
        <Column>
            <Boundary ref="boundary">
                <Loading v-if="loading || !veterans" />
                <Empty
                    v-else-if="veterans.length <= 0"
                    message="No veterans found!"
                />

                <Grid v-else :size="Size.SMALL">
                    <Card
                        v-for="veteran in veterans"
                        :title="
                            getFullName(veteran.firstName, veteran.lastName)
                        "
                        :image="veteran.image"
                        :options="true"
                        :height="Height.LARGE"
                    >
                        <Row
                            v-if="veteran.lastUpdatedAt && veteran.latestScore"
                        >
                            <Row>
                                <ClockIcon />
                                {{ veteran.lastUpdatedAt }}
                            </Row>

                            <Row>
                                <SmileIcon />
                                {{ veteran.latestScore }}/10
                            </Row>
                        </Row>
                        <p v-else>No statistics available</p>
                    </Card>
                </Grid>
            </Boundary>
        </Column>
    </Base>
</template>
