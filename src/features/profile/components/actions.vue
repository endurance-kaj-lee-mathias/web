<script setup lang="ts">
import Small from "@/components/common/buttons/small.vue";
import { Align } from "@/components/common/layout/align";
import { Gap } from "@/components/common/layout/gap";
import Row from "@/components/common/layout/row.vue";
import EditIcon from "@/components/icons/edit.vue";
import LogoutIcon from "@/components/icons/logout.vue";
import FriendIcon from "@/components/icons/friend.vue";
import { Viewer } from "@/features/profile/components/viewer";

defineProps<{
    preferences: () => void;
    logout: () => void;
    viewer: Viewer;
}>();
</script>

<template>
    <Row :gap="Gap.SMALL" :items="Align.CENTER">
        <Small v-if="viewer === Viewer.OWNER" :action="preferences">
            <EditIcon />
        </Small>

        <Small v-if="viewer === Viewer.OWNER" :action="logout">
            <LogoutIcon />
        </Small>

        <Small v-else action="/veterans"> <FriendIcon /> </Small>
    </Row>
</template>
