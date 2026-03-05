<script setup lang="ts">
import Base from "@/components/layout/base.vue";
import Column from "@/components/common/layout/column.vue";
import { Tabs } from "@/features/veterans/tabs";
import { ref } from "vue";
import Error from "@/components/common/states/error.vue";
import Row from "@/components/common/tabs/row.vue";
import Search from "@/features/veterans/components/search.vue";
import Veterans from "@/features/veterans/components/veterans.vue";
import { useTemplateRef } from "vue";
import { send } from "@/features/veterans/services/veterans";

const tab = ref(Tabs.VETERANS);
const boundary = useTemplateRef<InstanceType<typeof Error>>("boundary");

async function add(username: string) {
    if (username.length <= 0) return;

    try {
        await send(username);
    } catch (error: unknown) {
        boundary.value!.error = error as Error;
    }
}
</script>

<template>
    <Base>
        <Error>
            <Column>
                <Row
                    :titles="Object.values(Tabs)"
                    :current="tab"
                    :navigate="(title: string) => (tab = title as Tabs)"
                />

                <Column v-if="tab === Tabs.VETERANS">
                    <Error ref="boundary">
                        <Search :send="add" />
                        <Veterans />
                    </Error>
                </Column>
                <Column v-if="tab === Tabs.REQUESTS"> Requests </Column>
            </Column>
        </Error>
    </Base>
</template>
