<script setup lang="ts">
import Input from "@/components/common/inputs/input.vue";
import Column from "@/components/common/layout/column.vue";
import { Size } from "@/components/common/layout/grid";
import Grid from "@/components/common/layout/grid.vue";
import { useComputedField } from "@/features/profile/components/preferences/compute";

type Values = {
    firstName: string;
    lastName: string;
    userName: string;
    phone: string;
};

const props = defineProps<{ values: Values }>();
const emit = defineEmits<{ (e: "update:values", value: Values): void }>();

const firstName = useComputedField(props, emit, "firstName");
const lastName = useComputedField(props, emit, "lastName");
const userName = useComputedField(props, emit, "userName");
const phone = useComputedField(props, emit, "phone");
</script>

<template>
    <Column>
        <Grid :size="Size.SMALL">
            <Input v-model="firstName" label="First Name" />
            <Input v-model="lastName" label="Last Name" />
        </Grid>

        <Input v-model="userName" label="Username" />
        <Input v-model="phone" label="Phone" />
    </Column>
</template>
