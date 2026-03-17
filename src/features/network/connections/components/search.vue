<script setup lang="ts">
import Button from "@/components/common/buttons/button.vue";
import Input from "@/components/common/inputs/input.vue";
import AddIcon from "@/components/icons/add.vue";
import { Gap } from "@/components/common/layout/gap";
import { ref } from "vue";

defineProps<{
    add: (value: string) => void;
}>();

const emit = defineEmits(["update:modelValue"]);
const username = ref("");
</script>

<template>
    <form @submit.prevent="() => add(username)">
        <section :class="`grid sm:grid-cols-4 ${Gap.MEDIUM}`">
            <section class="sm:col-span-3">
                <Input
                    v-model="username"
                    :full="true"
                    placeholder="Search Username..."
                />
            </section>

            <Button :full="true">
                <AddIcon />
            </Button>
        </section>
    </form>
</template>
