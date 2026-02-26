<script setup lang="ts">
import Input from "@/components/common/inputs/input.vue";
import Column from "@/components/common/layout/column.vue";
import { Size } from "@/components/common/layout/grid";
import Grid from "@/components/common/layout/grid.vue";
import { computed } from "vue";
import type { Address } from "@/features/profile/models/address";
import Number from "@/components/common/inputs/number.vue";

const props = defineProps<{
    values: {
        firstName: string;
        name: string;
        address: Address;
        phone: string;
    };
}>();

const emit = defineEmits<{
    (e: "update:values", value: typeof props.values): void;
}>();

const firstName = computed({
    get: () => props.values.firstName,
    set: (val: string) =>
        emit("update:values", {
            ...props.values,
            firstName: val,
        }),
});

const name = computed({
    get: () => props.values.name,
    set: (val: string) =>
        emit("update:values", {
            ...props.values,
            name: val,
        }),
});

const address = computed({
    get: () => props.values.address,
    set: (val: typeof props.values.address) =>
        emit("update:values", {
            ...props.values,
            address: val,
        }),
});
</script>

<template>
    <Column>
        <Grid :size="Size.MEDIUM">
            <Input v-model="firstName" label="First Name" />
            <Input v-model="name" label="Last Name" />
        </Grid>

        <Input v-model="address.street" label="Street" />

        <Grid :size="Size.MEDIUM">
            <Number v-model="address.number" label="Number" />
            <Input v-model="address.addition" label="Addition" />
        </Grid>

        <Grid :size="Size.MEDIUM">
            <Input v-model="address.city" label="City" />
            <Number v-model="address.zip" label="Zip" />
        </Grid>
        <Input v-model="address.country" label="Country" />
    </Column>
</template>
