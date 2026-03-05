<script setup lang="ts">
import Input from "@/components/common/inputs/input.vue";
import Column from "@/components/common/layout/column.vue";
import { Size } from "@/components/common/layout/grid";
import Grid from "@/components/common/layout/grid.vue";
import { useComputedField } from "@/features/profile/components/preferences/compute";
import type { Personal as PersonalModel } from "@/features/profile/models/personal";

const props = defineProps<{ values: PersonalModel }>();
const emit = defineEmits<{
    (e: "update:values", value: PersonalModel): void;
}>();

const firstName = useComputedField(props, emit, "firstName");
const lastName = useComputedField(props, emit, "lastName");
const username = useComputedField(props, emit, "username");
const phoneNumber = useComputedField(props, emit, "phoneNumber");
</script>

<template>
    <Column>
        <Input label="Username" :disabled="true">
            {{ username }}
        </Input>

        <Grid :size="Size.SMALL">
            <Input v-model="firstName" label="First Name" :required="true" />
            <Input v-model="lastName" label="Last Name" :required="true" />
        </Grid>

        <Input v-model="phoneNumber" label="Phone Number" :required="true" />
    </Column>
</template>
