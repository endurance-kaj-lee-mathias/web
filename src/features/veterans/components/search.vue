<script setup lang="ts">
import Button from "@/components/common/buttons/button.vue";
import Input from "@/components/common/inputs/input.vue";
import { Gap } from "@/components/common/layout/gap";
import Error from "@/components/common/states/error.vue";
import { send } from "@/features/veterans/services/veterans";
import { useTemplateRef } from "vue";
import { reactive } from "vue";
import { ref } from "vue";

const boundary = useTemplateRef<InstanceType<typeof Error>>("boundary");
const username = ref("");
const state = reactive({
    loading: false,
});

async function add() {
    if (username.value.length <= 0) return;

    try {
        state.loading = true;
        await send(username.value);
        state.loading = false;
    } catch (error: unknown) {
        state.loading = false;
        boundary.value!.error = error as Error;
    }
}
</script>

<template>
    <form @submit.prevent="add">
        <Error ref="boundary">
            <section :class="`grid sm:grid-cols-4 ${Gap.MEDIUM}`">
                <section class="sm:col-span-3">
                    <Input
                        v-model="username"
                        :full="true"
                        placeholder="Search Username..."
                    />
                </section>

                <Button :full="true">Add</Button>
            </section>
        </Error>
    </form>
</template>
