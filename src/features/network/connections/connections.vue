<script setup lang="ts">
import Small from "@/components/common/buttons/small.vue";
import Card from "@/components/common/card/card.vue";
import Column from "@/components/common/layout/column.vue";
import { Size } from "@/components/common/layout/grid";
import Grid from "@/components/common/layout/grid.vue";
import Boundary from "@/components/common/states/boundary.vue";
import Empty from "@/components/common/states/empty.vue";
import Loading from "@/components/common/states/loading.vue";
import RemoveIcon from "@/components/icons/remove.vue";
import VisibilityIcon from "@/components/icons/visibility.vue";
import Base from "@/components/layout/base.vue";
import type { ConnectionId } from "@/features/network/models/id";
import Add from "@/features/network/connections/components/add.vue";
import Header from "@/features/network/components/header.vue";
import Search from "@/features/network/connections/components/search.vue";
import { useConnections } from "@/features/network/connections/composables/use-connections";
import { add as addVeteran } from "@/features/network/connections/services/requests";
import { remove as removeVeteran } from "@/features/network/connections/services/connections";
import { getFullName, getCapitalized } from "@/lib/name";
import { ref, useTemplateRef, watchEffect } from "vue";
import Privacy from "@/features/network/connections/components/privacy/privacy.vue";
import type { Connection } from "@/features/network/connections/models/connection";
import Row from "@/components/common/layout/row.vue";
import AtIcon from "@/components/icons/at.vue";
import TagIcon from "@/components/icons/tag.vue";
import { Gap } from "@/components/common/layout/gap";
import { SmallStyle } from "@/components/common/buttons/style";

const boundary = useTemplateRef<InstanceType<typeof Boundary>>("boundary");
const { connections, loading, error, fetch } = useConnections();
watchEffect(() => error.value && boundary.value?.capture(error.value));

const state = ref({
    add: {
        note: false,
        username: "",
    },
    privacy: {
        privacy: false,
        veteran: null as Connection | null,
    },
});

async function add(value: string) {
    if (value.length <= 0) return;

    state.value.add.username = value;
    state.value.add.note = true;
    boundary.value!.error = null;
}

async function privacy(veteran: Connection) {
    state.value.privacy.veteran = veteran;
    state.value.privacy.privacy = true;
    boundary.value!.error = null;
}

async function send(username: string, note: string) {
    state.value.add.note = false;

    try {
        await addVeteran(username, note);
        state.value.add.username = "";
        boundary.value!.error = null;
    } catch (error: unknown) {
        boundary.value!.error = error as Error;
    }
}

async function remove(id: ConnectionId) {
    try {
        await removeVeteran(id);
        state.value.add.note = false;
        boundary.value!.error = null;
        fetch();
    } catch (error: unknown) {
        boundary.value!.error = error as Error;
    }
}
</script>

<template>
    <Base>
        <Column>
            <Header />
            <Search :add="add" />

            <Boundary ref="boundary">
                <Loading v-if="loading || !connections" />
                <Empty
                    v-else-if="connections.length <= 0"
                    message="No veterans found!"
                />

                <Column v-else>
                    <Grid :size="Size.SMALL">
                        <Card
                            v-for="veteran in connections"
                            :title="
                                getFullName(veteran.firstName, veteran.lastName)
                            "
                            :image="veteran.image"
                            :options="true"
                        >
                            <Row>
                                <Row :gap="Gap.SMALL">
                                    <AtIcon />
                                    {{ veteran.username }}
                                </Row>

                                <Row :gap="Gap.SMALL">
                                    <TagIcon />
                                    {{ getCapitalized(veteran.role) }}
                                </Row>
                            </Row>

                            <template v-slot:options>
                                <Small
                                    :action="() => privacy(veteran)"
                                    :style="SmallStyle.ALTERNATE"
                                >
                                    <VisibilityIcon />
                                </Small>

                                <Small
                                    :action="() => remove(veteran.id)"
                                    :style="SmallStyle.ALTERNATE"
                                >
                                    <RemoveIcon />
                                </Small>
                            </template>
                        </Card>
                    </Grid>

                    <Privacy
                        v-if="state.privacy.veteran"
                        v-model="state.privacy.privacy"
                        :connection="state.privacy.veteran"
                        @saved="() => (state.privacy.privacy = false)"
                    />
                </Column>

                <Add
                    v-model="state.add.note"
                    :username="state.add.username"
                    :send="send"
                />
            </Boundary>
        </Column>
    </Base>
</template>
