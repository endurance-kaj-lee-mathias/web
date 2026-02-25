<script setup lang="ts">
import Base from "@/components/layout/base.vue";
import Information from "@/features/profile/components/information.vue";
import { Viewer } from "@/features/profile/components/viewer";
import Introduction from "@/features/profile/components/introduction.vue";
import Column from "@/components/common/layout/column.vue";
import { Gap } from "@/components/common/layout/gap";
import { useKeycloak } from "@josempgon/vue-keycloak";
import { onMounted } from "vue";
import type { Ref } from "vue";
import type { Profile } from "@/features/profile/models/profile";
import { ref } from "vue";
import { getOrCreate } from "@/features/profile/services/profile";
import Empty from "@/components/common/states/empty.vue";
import Preferences from "@/features/profile/components/preferences.vue";

const keycloak = useKeycloak();
const profile: Ref<Profile | null> = ref(null);

onMounted(async () => {
    profile.value = await getOrCreate();
});

function logout() {
    if (!keycloak.keycloak.value) return;
    keycloak.keycloak.value.logout();
}
</script>

<template>
    <Base>
        <Empty v-if="!profile" />

        <Column v-else :gap="Gap.EXTRA_LARGE">
            <Information
                :name="profile.name"
                :username="profile.username"
                :about="profile.about"
                :image="profile.image"
                :logout="logout"
                :viewer="Viewer.OWNER"
            />

            <Introduction
                :username="profile.username"
                :introduction="profile.introduction"
            />

            <Preferences />
        </Column>
    </Base>
</template>
