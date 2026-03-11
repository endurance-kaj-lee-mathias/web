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
    resource: Resource;
    effect: Effect;
    remove: () => void;
}>();
</script>

<template>
    <form @submit.prevent="() => remove()">
        <section :class="`grid sm:grid-cols-4 ${Gap.MEDIUM}`">
            <section class="sm:col-span-3">
                <section :class="`grid sm:grid-cols-2 ${Gap.MEDIUM}`">
                    <Select :disabled="true">
                        {{ formatResource(resource) }}
                    </Select>

                    <Select :disabled="true">
                        {{ formatEffect(effect) }}
                    </Select>
                </section>
            </section>

            <Button :full="true">Remove</Button>
        </section>
    </form>
</template>
