<script setup lang="ts">
import Row from "@/components/common/layout/row.vue";
import { Gap } from "@/components/common/layout/gap";
</script>

<template>
    <section class="bg-light-2 shadow-sm rounded-lg p-1">
        <Row :responsive="false" :wrap="true" :gap="Gap.SMALL">
            <slot />
        </Row>
    </section>
</template>
