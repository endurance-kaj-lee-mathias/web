<script setup lang="ts">
import {
    Effect,
    Resource,
    formatResource,
    formatEffect,
} from "@/features/veterans/veterans/models/rule";
import Select from "@/components/common/inputs/select.vue";
import { ref } from "vue";
import Group from "@/components/common/inputs/group.vue";

const props = defineProps<{
    username: string;
    resource: Resource;
    effect: Effect;
}>();

const resource = formatResource(props.resource);
const effect = ref(props.effect);
</script>

<template>
    <Select
        :label="resource"
        :description="`Can @${username} take a look at your ${resource.toLowerCase()}?`"
        v-model="effect"
    >
        <option v-for="effect in Object.values(Effect)" :value="effect">
            {{ formatEffect(effect) }}
        </option>
    </Select>
</template>
