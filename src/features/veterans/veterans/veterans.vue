<script setup lang="ts">
import Small from "@/components/common/buttons/small.vue";
import Card from "@/components/common/card/card.vue";
import Column from "@/components/common/layout/column.vue";
import { Size } from "@/components/common/layout/grid";
import Grid from "@/components/common/layout/grid.vue";
import Boundary from "@/components/common/states/boundary.vue";
import Empty from "@/components/common/states/empty.vue";
import Loading from "@/components/common/states/loading.vue";
import Row from "@/components/common/tabs/links/row.vue";
import RemoveIcon from "@/components/icons/remove.vue";
import VisibilityIcon from "@/components/icons/visibility.vue";
import Base from "@/components/layout/base.vue";
import type { VeteranId } from "@/features/veterans/models/id";
import { Tabs } from "@/features/veterans/tabs";
import Add from "@/features/veterans/veterans/components/add.vue";
import Search from "@/features/veterans/veterans/components/search.vue";
import { useVeterans } from "@/features/veterans/veterans/composables/use-veterans";
import { add as addVeteran } from "@/features/veterans/veterans/services/requests";
import { remove as removeVeteran } from "@/features/veterans/veterans/services/veterans";
import { getFullName } from "@/lib/name";
import { ref, useTemplateRef, watchEffect } from "vue";
import Privacy from "./components/privacy/privacy.vue";
import type { Veteran } from "./models/veteran";

const boundary = useTemplateRef<InstanceType<typeof Boundary>>("boundary");
const { veterans, loading, error, fetch } = useVeterans();
watchEffect(() => error.value && boundary.value?.capture(error.value));

const state = ref({
    add: {
        note: false,
        username: "",
    },
    privacy: {
        privacy: false,
        veteran: null as Veteran | null,
    },
});

async function add(value: string) {
    if (value.length <= 0) return;

    state.value.add.username = value;
    state.value.add.note = true;
    boundary.value!.error = null;
}

async function privacy(veteran: Veteran) {
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

async function remove(id: VeteranId) {
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
            <Row :tabs="Object.values(Tabs)" />
            <Search :add="add" />

            <Boundary ref="boundary">
                <Loading v-if="loading || !veterans" />
                <Column v-else-if="veterans.length <= 0">
                    <Empty message="No veterans found!" />
                    <Add
                        v-model="state.add.note"
                        :username="state.add.username"
                        :send="send"
                    />
                </Column>

                <Column v-else>
                    <Grid :size="Size.SMALL">
                        <Card
                            v-for="veteran in veterans"
                            :title="
                                getFullName(veteran.firstName, veteran.lastName)
                            "
                            :image="veteran.image"
                            :options="true"
                        >
                            <p>@{{ veteran.username }}</p>

                            <template v-slot:options>
                                <Small
                                    :alternative="true"
                                    :click="() => privacy(veteran)"
                                >
                                    <VisibilityIcon />
                                </Small>

                                <Small
                                    :alternative="true"
                                    :click="() => remove(veteran.id)"
                                >
                                    <RemoveIcon />
                                </Small>
                            </template>
                        </Card>
                    </Grid>

                    <Privacy
                        v-if="state.privacy.veteran"
                        v-model="state.privacy.privacy"
                        :veteran="state.privacy.veteran"
                        @saved="() => (state.privacy.privacy = false)"
                    />
                </Column>
            </Boundary>
        </Column>
    </Base>
</template>
