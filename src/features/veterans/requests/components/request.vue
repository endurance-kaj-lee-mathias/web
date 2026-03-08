<script setup lang="ts">
import Button from "@/components/common/buttons/button.vue";
import Card from "@/components/common/card/card.vue";

defineProps<{ name: string; username: string; image: string }>();
</script>

<template>
    <Card :title="name" :image="image" :footer="true" :options="true">
        <p>@{{ username }}</p>
        <template v-slot:footer>
            <Button>Read</Button>
        </template>
    </Card>
</template>
