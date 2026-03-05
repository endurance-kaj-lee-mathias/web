<script setup lang="ts">
import Button from "@/components/common/buttons/button.vue";
import Input from "@/components/common/inputs/input.vue";
import { Gap } from "@/components/common/layout/gap";
import { ref } from "vue";

const query = ref("");
</script>

<template>
    <section :class="`grid sm:grid-cols-4 ${Gap.MEDIUM}`">
        <section class="sm:col-span-3">
            <Input
                v-model="query"
                :full="true"
                placeholder="Search Username..."
            />
        </section>

        <Button :full="true">Add</Button>
    </section>
</template>
