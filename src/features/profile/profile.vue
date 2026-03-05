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
import { getOrCreate as getOrCreateProfile } from "@/features/profile/services/profile";
import Preferences from "@/features/profile/components/preferences/preferences.vue";
import Loading from "@/components/common/states/loading.vue";
import Error from "@/components/common/states/error.vue";

const keycloak = useKeycloak();
const profile: Ref<Profile | null> = ref(null);
const preferences = ref(false);

onMounted(async () => await fetch());

async function fetch() {
    profile.value = await getOrCreateProfile();
}

function logout() {
    if (!keycloak.keycloak.value) return;
    keycloak.keycloak.value.logout();
}
</script>

<template>
    <Base>
        <Error>
            <Loading v-if="!profile" />

            <Column v-else :gap="Gap.EXTRA_LARGE">
                <Information
                    :name="`${profile.firstName} ${profile.lastName}`"
                    :username="profile.username"
                    :about="profile.about"
                    :image="profile.image"
                    :preferences="() => (preferences = true)"
                    :logout="logout"
                    :viewer="Viewer.OWNER"
                />

                <Introduction
                    :username="profile.username"
                    :introduction="profile.introduction"
                />

                <Preferences
                    v-model="preferences"
                    :personal="{
                        firstName: profile.firstName,
                        lastName: profile.lastName,
                        username: profile.username,
                        phoneNumber: profile.phoneNumber,
                    }"
                    :address="{
                        street: profile.address.street,
                        locality: profile.address.locality,
                        postalCode: profile.address.postalCode,
                        region: profile.address.region,
                        country: profile.address.country,
                    }"
                    :about="{
                        about: profile.about,
                        introduction: profile.introduction,
                    }"
                    @saved="fetch"
                />
            </Column>
        </Error>
    </Base>
</template>
