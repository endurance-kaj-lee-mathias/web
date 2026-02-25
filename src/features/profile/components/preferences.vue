<script lang="ts" setup>
import { Dialog, DialogContent } from "@/components/common/dialog/dialog";
defineProps<{ modelValue: boolean }>();
</script>

<template>
    <Dialog
        :open="modelValue"
        @update:open="$emit('update:modelValue', $event)"
    >
        <DialogContent
            title="Preferences"
            description="Edit your profile details."
        >
            Dialog Content
        </DialogContent>
    </Dialog>
</template>
