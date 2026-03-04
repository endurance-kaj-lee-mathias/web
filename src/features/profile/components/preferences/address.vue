<script setup lang="ts">
import Input from "@/components/common/inputs/input.vue";
import Number from "@/components/common/inputs/number.vue";
import Column from "@/components/common/layout/column.vue";
import { Size } from "@/components/common/layout/grid";
import Grid from "@/components/common/layout/grid.vue";
import { useComputedField } from "@/features/profile/components/preferences/compute";
import type { Address as AddressModel } from "@/features/profile/models/address";

const props = defineProps<{ values: AddressModel }>();
const emit = defineEmits<{ (e: "update:values", value: AddressModel): void }>();

const street = useComputedField(props, emit, "street");
const locality = useComputedField(props, emit, "locality");
const postalCode = useComputedField(props, emit, "postalCode");
const region = useComputedField(props, emit, "region");
const country = useComputedField(props, emit, "country");
</script>

<template>
    <Column>
        <Input v-model="street" label="Street and Number" :required="true" />

        <Grid :size="Size.SMALL">
            <Input v-model="locality" label="City" :required="true" />
            <Number v-model="postalCode" label="Postal Code" :required="true" />
        </Grid>

        <Input v-model="region" label="Region" :required="true" />
        <Input v-model="country" label="Country" :required="true" />
    </Column>
</template>
