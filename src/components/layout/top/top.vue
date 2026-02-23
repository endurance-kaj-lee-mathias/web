<script setup lang="ts">
import { Align } from "@/components/common/layout/align";
import { Justify } from "@/components/common/layout/justify";
</script>

<template>
    <nav
        :class="`flex flex-row ${Justify.BETWEEN} ${Align.CENTER} bg-light-2 border-b-2 border-medium-3 p-2`"
    >
        Top
    </nav>
</template>
