<script setup lang="ts">
import Input from "@/components/common/inputs/input.vue";
import Number from "@/components/common/inputs/number.vue";
import Column from "@/components/common/layout/column.vue";
import { Size } from "@/components/common/layout/grid";
import Grid from "@/components/common/layout/grid.vue";
import { useComputedField } from "@/features/profile/components/preferences/compute";

type Values = {
    street: string;
    number: number;
    city: string;
    zip: number;
    country: string;
};

const props = defineProps<{ values: Values }>();
const emit = defineEmits<{ (e: "update:values", value: Values): void }>();

const street = useComputedField(props, emit, "street");
const number = useComputedField(props, emit, "number");
const city = useComputedField(props, emit, "city");
const zip = useComputedField(props, emit, "zip");
const country = useComputedField(props, emit, "country");
</script>

<template>
    <Column>
        <Input v-model="street" label="Street" />
        <Number v-model="number" label="Number" />

        <Grid :size="Size.SMALL">
            <Input v-model="city" label="City" />
            <Number v-model="zip" label="Zip" />
        </Grid>

        <Input v-model="country" label="Country" />
    </Column>
</template>
