<script setup lang="ts">
import Information from "@/features/journals/components/information.vue";
import { getFullName } from "@/lib/name";
import TabRow from "@/components/common/tabs/links/row.vue";
import { getTabs } from "@/features/journals/tabs";
import type { Profile } from "@/features/journals/models/journal/profile";

defineProps<{ profile: Profile }>();
</script>

<template>
    <Information
        :name="getFullName(profile.firstName, profile.lastName)"
        :username="profile.username"
        :about="profile.about"
        :image="profile.image"
    />

    <TabRow :tabs="Object.values(getTabs(profile.username))" />
</template>
