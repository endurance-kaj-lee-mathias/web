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
    logout: () => void;
    viewer: Viewer;
}>();
</script>

<template>
    <Row :gap="Gap.SMALL" :items="Align.CENTER" :responsive="false">
        <Small v-if="viewer === Viewer.OWNER" :click="() => {}">
            <EditIcon />
        </Small>

        <Small v-if="viewer === Viewer.OWNER" :click="logout">
            <LogoutIcon />
        </Small>

        <Small v-else :click="() => {}">
            <FriendIcon />
        </Small>
    </Row>
</template>
