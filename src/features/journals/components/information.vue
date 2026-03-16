<script setup lang="ts">
import Dynamic from "@/components/common/images/dynamic.vue";
import { Align } from "@/components/common/layout/align";
import Column from "@/components/common/layout/column.vue";
import { Gap } from "@/components/common/layout/gap";
import { Justify } from "@/components/common/layout/justify";
import { Padding } from "@/components/common/layout/padding";
import Row from "@/components/common/layout/row.vue";
import Actions from "@/features/journals/components/actions.vue";

defineProps<{
    name: string;
    username: string;
    about: string;
    image: string;
}>();
</script>

<template>
    <Row :justify="Justify.BETWEEN" :items="Align.STRETCH" :responsive="true">
        <Row :gap="Gap.LARGE" :items="Align.STRETCH" :responsive="true">
            <Dynamic :src="image" :alt="`Picture of ${name}`" />

            <Column :padding="Padding.SMALL">
                <Column :gap="Gap.NONE">
                    <Row :items="Align.CENTER" :wrap="true">
                        <h2 class="max-w-xs text-3xl font-bold truncate">
                            {{ name }}
                        </h2>

                        <section class="block md:hidden">
                            <Actions />
                        </section>
                    </Row>

                    <h3 className="max-w-xs text-medium text-lg truncate">
                        @{{ username }}
                    </h3>
                </Column>

                <p class="max-w-xs truncate">
                    {{ about }}
                </p>
            </Column>
        </Row>

        <section class="hidden md:block">
            <Actions />
        </section>
    </Row>
</template>
