<script setup lang="ts">
import Card from "@/components/common/card/card.vue";

defineProps<{ name: string; username: string; image: string }>();
</script>

<template>
    <Card
        :title="name"
        image="/images/logo.svg"
        :action="() => {}"
        :footer="true"
        :options="true"
    >
        <template v-slot:footer>
            <p>@{{ username }}</p>
        </template>

        <template v-slot:options>
            <p>@{{ username }}</p>
        </template>
    </Card>
</template>
