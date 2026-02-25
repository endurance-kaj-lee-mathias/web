<script lang="ts" setup>
import { Dialog, DialogContent } from "@/components/common/dialog/dialog";
import { ref } from "vue";

const state = ref(false);
</script>

<template>
    <button @click="state = true">Open Dialog</button>

    <Dialog v-model:open="state">
        <DialogContent
            title="Preferences"
            description="Edit your profile details."
        >
            Dialog Content
        </DialogContent>
    </Dialog>
</template>
