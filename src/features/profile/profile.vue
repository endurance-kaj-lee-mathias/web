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
import Preferences from "@/features/profile/components/preferences/preferences.vue";
import Error from "@/components/common/states/error.vue";

const keycloak = useKeycloak();
const profile: Ref<Profile | null> = ref(null);
const preferences = ref(false);

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
        <Error>
            <Column :gap="Gap.EXTRA_LARGE">
                <Information
                    :name="`${profile.firstName} ${profile.lastName}`"
                    :username="profile.userName"
                    :about="profile.about"
                    :image="profile.image"
                    :preferences="() => (preferences = true)"
                    :logout="logout"
                    :viewer="Viewer.OWNER"
                />

                <Introduction
                    :username="profile.userName"
                    :introduction="profile.introduction"
                />

                <Preferences
                    v-model="preferences"
                    :personal="{
                        firstName: profile.firstName,
                        lastName: profile.lastName,
                        userName: profile.userName,
                        phone: '',
                    }"
                    :address="{
                        street: profile.address.street,
                        number: profile.address.number,
                        city: profile.address.city,
                        zip: profile.address.zip,
                        country: profile.address.country,
                    }"
                    :about="{
                        about: profile.about,
                        introduction: profile.introduction,
                    }"
                    :save="
                        (about: string, introduction: string) => {
                            console.log(about + ' ' + introduction);
                        }
                    "
                />
            </Column>
        </Error>
    </Base>
</template>
