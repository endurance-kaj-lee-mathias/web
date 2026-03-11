<script setup lang="ts">
import Button from "@/components/common/buttons/button.vue";
import { Gap } from "@/components/common/layout/gap";
import { ref } from "vue";
import {
    Effect,
    Resource,
    formatResource,
    formatEffect,
} from "@/features/veterans/veterans/models/rule";
import Select from "@/components/common/inputs/select.vue";

defineProps<{
    loading: boolean;
    add: (resource: Resource, effect: Effect) => void;
}>();

const emit = defineEmits(["update:modelValue"]);
const resource = ref(Resource.PROFILE);
const effect = ref(Effect.DENY);
</script>

<template>
    <form @submit.prevent="() => add(resource, effect)">
        <section :class="`grid sm:grid-cols-4 ${Gap.MEDIUM}`">
            <section class="sm:col-span-3">
                <section :class="`grid sm:grid-cols-2 ${Gap.MEDIUM}`">
                    <Select v-model="resource">
                        <option
                            v-for="resource in Object.values(Resource)"
                            :value="resource"
                        >
                            {{ formatResource(resource) }}
                        </option>
                    </Select>

                    <Select v-model="effect">
                        <option
                            v-for="effect in Object.values(Effect)"
                            :value="effect"
                        >
                            {{ formatEffect(effect) }}
                        </option>
                    </Select>
                </section>
            </section>

            <Button :full="true" :disabled="loading">Add</Button>
        </section>
    </form>
</template>
