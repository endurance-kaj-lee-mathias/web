<script setup lang="ts">
defineProps<{
    id: string;
    name: string;
    username: string;
    image: string;
    remove: (id: string) => void;
}>();
</script>

<template>
    <Card :title="name" :image="image" :footer="true" :options="true">
        <p>@{{ username }}</p>
        <template v-slot:footer>
            <Button @click="remove(id)">Remove</Button>
        </template>
    </Card>
</template>
