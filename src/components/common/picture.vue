<script setup lang="ts">
import { Align } from "@/components/common/layout/align";
import { Justify } from "@/components/common/layout/justify";
import { computed, ref } from "vue";

const props = defineProps<{
    image: string;
    username: string;
}>();

const error = ref(false);
const fallback = computed(() => !props.image || error.value);
</script>

<template>
    <article
        :class="`bg-cover shadow-sm bg-center w-26 rounded-lg flex ${Justify.CENTER} ${Align.CENTER} ${fallback ? 'bg-accent text-light-2 text-3xl' : ''}`"
        :style="!fallback ? `background-image: url('${image}');` : ''"
    >
        <span v-if="fallback">{{
            username.substring(0, 1).toUpperCase()
        }}</span>

        <img
            v-if="image && !error"
            :src="image"
            class="hidden"
            @error="error = true"
        />
    </article>
</template>
