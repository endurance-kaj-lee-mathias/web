<script setup lang="ts">
import Select from "@/components/common/inputs/select.vue";
import Column from "@/components/common/layout/column.vue";
import { useComputedField } from "@/features/profile/components/preferences/compute";
import type { Privacy as PrivacyModel } from "@/features/profile/models/privacy";

const props = defineProps<{ values: PrivacyModel }>();
const emit = defineEmits<{ (e: "update:values", value: PrivacyModel): void }>();

const profile = useComputedField(props, emit, "userProfile");
const calendar = useComputedField(props, emit, "calendar");
</script>

<template>
    <Column>
        <Select
            label="Profile"
            description="Can connections take a look at your profile?"
            :modelValue="profile"
            @update:modelValue="profile = $event === 'true'"
        >
            <option :value="false">Allow</option>
            <option :value="true">Deny</option>
        </Select>

        <Select
            label="Calendar"
            description="Can connections take a look at your calendar?"
            :modelValue="calendar"
            @update:modelValue="calendar = $event === 'true'"
        >
            <option :value="false">Allow</option>
            <option :value="true">Deny</option>
        </Select>
    </Column>
</template>
