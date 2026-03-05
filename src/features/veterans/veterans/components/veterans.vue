<script setup lang="ts">
import Grid from "@/components/common/layout/grid.vue";
import Error from "@/components/common/states/error.vue";
import { ref } from "vue";
import { useTemplateRef } from "vue";
import { reactive } from "vue";
import type { Veteran } from "@/features/veterans/models/veteran";
import { onMounted } from "vue";
import { getAll } from "@/features/veterans/services/veterans";

const boundary = useTemplateRef<InstanceType<typeof Error>>("boundary");
const veterans = ref(null as Veteran[] | null);
const state = reactive({
    loading: false,
});

onMounted(async () => await fetch());

async function fetch() {
    state.loading = true;
    veterans.value = await getAll();
    state.loading = false;
}
</script>

<template>
    <Error ref="boundary">
        <Loading v-if="!veterans" />
        <Message v-else-if="veterans.length <= 0">
            No Veterans Found...
        </Message>

        <Grid v-else>
            <p v-for="veteran in veterans">{{ veteran.username }}</p>
        </Grid>
    </Error>
</template>
