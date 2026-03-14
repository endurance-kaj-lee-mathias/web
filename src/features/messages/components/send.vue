<script setup lang="ts">
import Button from "@/components/common/buttons/button.vue";
import Input from "@/components/common/inputs/input.vue";
import { Gap } from "@/components/common/layout/gap";
import SendIcon from "@/components/icons/send.vue";
import { ref } from "vue";

const props = defineProps<{
    send: (value: string) => void;
}>();

const emit = defineEmits(["update:modelValue"]);
const message = ref("");

function send() {
    if (message.value.length <= 0) return;
    message.value = "";
    props.send(message.value);
}
</script>

<template>
    <form @submit.prevent="() => send()">
        <section :class="`grid sm:grid-cols-4 ${Gap.MEDIUM}`">
            <section class="sm:col-span-3">
                <Input
                    v-model="message"
                    :full="true"
                    placeholder="Enter Message..."
                />
            </section>

            <Button :full="true">
                <SendIcon />
            </Button>
        </section>
    </form>
</template>
