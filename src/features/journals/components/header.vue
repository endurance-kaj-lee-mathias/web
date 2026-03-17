<script setup lang="ts">
import Information from "@/features/journals/components/information.vue";
import { getFullName } from "@/lib/name";
import TabHeader from "@/components/common/tabs/tab-header.vue";
import type { Profile } from "@/features/journals/models/journal/profile";
import TabLink from "@/components/common/tabs/tab-link.vue";
import Stack from "@/components/common/layout/stack.vue";
import { Align } from "@/components/common/layout/align";

defineProps<{ profile: Profile }>();
</script>

<template>
    <Information
        :name="getFullName(profile.firstName, profile.lastName)"
        :username="profile.username"
        :about="profile.about"
        :image="profile.image"
    />

    <Stack :align="Align.START">
        <TabHeader>
            <TabLink :href="`/journals/@${profile.username}`">Mood</TabLink>
            <TabLink :href="`/journals/@${profile.username}/stress`"
                >Stress</TabLink
            >
        </TabHeader>
    </Stack>
</template>
