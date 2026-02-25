<script setup lang="ts">
import Small from "@/components/common/buttons/small.vue";
import Column from "@/components/common/layout/column.vue";
import { Align } from "@/components/common/layout/align";
import { Gap } from "@/components/common/layout/gap";
import { Justify } from "@/components/common/layout/justify";
import { Padding } from "@/components/common/layout/padding";
import Row from "@/components/common/layout/row.vue";
import { Viewer } from "@/features/profile/components/viewer";
import Actions from "@/features/profile/components/actions.vue";
import Dynamic from "@/components/common/images/dynamic.vue";

defineProps<{
    name: string;
    username: string;
    about: string;
    image: string;
    preferences: () => void;
    logout: () => void;
    viewer: Viewer;
}>();
</script>

<template>
    <Row :justify="Justify.BETWEEN" :items="Align.STRETCH" :responsive="true">
        <Row :gap="Gap.LARGE" :items="Align.STRETCH">
            <Dynamic :src="image" :alt="`Picture of ${name}`" />

            <Column :padding="Padding.SMALL">
                <Column :gap="Gap.NONE">
                    <Row
                        :gap="Gap.LARGE"
                        :items="Align.CENTER"
                        :responsive="false"
                    >
                        <h2 class="max-w-xs text-3xl font-bold truncate">
                            {{ name }}
                        </h2>
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

        <section class="flex flex-col md:justify-between md:items-end p-1">
            <Actions
                :preferences="preferences"
                :logout="logout"
                :viewer="viewer"
            />

            <Row :gap="Gap.LARGE">
                <Statistic title="Level" value="{level.toString()}" />
                <Statistic title="Time Played" value="{playTime.toString()}" />
            </Row>
        </section>
    </Row>
</template>
