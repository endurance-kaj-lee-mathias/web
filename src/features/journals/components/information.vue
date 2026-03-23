<script setup lang="ts">
import { Align } from "@/components/common/layout/align";
import Column from "@/components/common/layout/column.vue";
import { Gap } from "@/components/common/layout/gap";
import { Justify } from "@/components/common/layout/justify";
import { Padding } from "@/components/common/layout/padding";
import Row from "@/components/common/layout/row.vue";
import Picture from "@/components/common/picture.vue";
import Stack from "@/components/common/layout/stack.vue";
import Actions from "@/features/journals/components/actions.vue";

defineProps<{
    name: string;
    username: string;
    about: string;
    image: string;
}>();
</script>

<template>
    <Column>
        <Row
            :justify="Justify.BETWEEN"
            :items="Align.STRETCH"
            :responsive="true"
        >
            <Row :gap="Gap.LARGE" :items="Align.STRETCH">
                <Picture :image="image" :username="username" />

                <Column :padding="Padding.SMALL">
                    <Column :gap="Gap.SMALL">
                        <Stack>
                            <h2 class="max-w-xs text-3xl font-bold truncate">
                                {{ name }}
                            </h2>
                            <h3
                                className="max-w-xs text-medium text-lg truncate"
                            >
                                @{{ username }}
                            </h3>
                        </Stack>

                        <section class="block md:hidden">
                            <Actions />
                        </section>
                    </Column>

                    <p class="hidden md:block max-w-xs truncate">
                        {{ about }}
                    </p>
                </Column>
            </Row>

            <section class="hidden md:block">
                <Actions />
            </section>
        </Row>

        <p class="block md:hidden">{{ about }}</p>
    </Column>
</template>
