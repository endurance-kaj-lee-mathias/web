<script setup lang="ts">
import Button from "@/components/common/buttons/button.vue";
import Input from "@/components/common/inputs/input.vue";
import { Gap } from "@/components/common/layout/gap";
import Grid from "@/components/common/layout/grid.vue";
import Error from "@/components/common/states/error.vue";
import { send } from "@/features/veterans/services/veterans";
import { useTemplateRef } from "vue";
import { reactive } from "vue";
import { ref } from "vue";

const boundary = useTemplateRef<InstanceType<typeof Error>>("boundary");
const state = reactive({
    loading: false,
});
</script>

<template>
    <Error ref="boundary">
        <Grid>
            <p>A</p>
        </Grid>
    </Error>
</template>
