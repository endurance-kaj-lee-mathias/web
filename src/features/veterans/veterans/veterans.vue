<script setup lang="ts">
import Base from "@/components/layout/base.vue";
import Column from "@/components/common/layout/column.vue";
import { Tabs } from "@/features/veterans/tabs";
import Error from "@/components/common/states/error.vue";
import Row from "@/components/common/tabs/links/row.vue";
import Search from "@/features/veterans/veterans/components/search.vue";
import Grid from "@/components/common/layout/grid.vue";
import Empty from "@/components/common/states/empty.vue";
import type { Veteran } from "@/features/veterans/veterans/models/veteran";
import { getAll } from "@/features/veterans/veterans/services/veterans";
import { onMounted, onUnmounted, reactive, ref, useTemplateRef } from "vue";
import {
    add as addVeteran,
    remove as removeVeteran,
} from "@/features/veterans/veterans/services/veterans";
import Loading from "@/components/common/states/loading.vue";
import { POLLING_RATE } from "@/lib/polling";
import type { VeteranId } from "@/features/veterans/models/id";
import { getFullName } from "@/lib/name";
import Card from "@/components/common/card/card.vue";
import Button from "@/components/common/buttons/button.vue";

const boundary = useTemplateRef<InstanceType<typeof Error>>("boundary");
const veterans = ref(null as Veteran[] | null);
const state = reactive({
    loading: false,
});

let interval: number | undefined;

onMounted(async () => {
    await fetch();
    interval = window.setInterval(fetch, POLLING_RATE);
});

onUnmounted(() => {
    if (!interval) return;
    clearInterval(interval);
});

async function fetch() {
    try {
        state.loading = true;
        veterans.value = await getAll();
        state.loading = false;
    } catch (error: unknown) {
        boundary.value!.error = error as Error;
    }
}

async function add(username: string) {
    if (username.length <= 0) return;

    try {
        await addVeteran(username);
    } catch (error: unknown) {
        boundary.value!.error = error as Error;
    }
}

async function remove(id: VeteranId) {
    try {
        await removeVeteran(id);
    } catch (error: unknown) {
        boundary.value!.error = error as Error;
    }
}
</script>

<template>
    <Base>
        <Column>
            <Row :tabs="Object.values(Tabs)" />
            <Search :send="add" />

            <Error ref="boundary">
                <Loading v-if="!veterans" />
                <Empty
                    v-else-if="veterans.length <= 0"
                    message="No veterans found!"
                />

                <Grid v-else>
                    <Card
                        v-for="veteran in veterans"
                        :title="
                            getFullName(veteran.firstName, veteran.lastName)
                        "
                        :image="veteran.image"
                        :footer="true"
                        :options="true"
                    >
                        <p>@{{ veteran.username }}</p>
                        <template v-slot:footer>
                            <Button @click="remove(veteran.id)">Remove</Button>
                        </template>
                    </Card>
                </Grid>
            </Error>
        </Column>
    </Base>
</template>
