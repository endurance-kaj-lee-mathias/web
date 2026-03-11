<script setup lang="ts">
import Base from "@/components/layout/base.vue";
import Information from "@/features/profile/components/information.vue";
import { Viewer } from "@/features/profile/components/viewer";
import Introduction from "@/features/profile/components/introduction.vue";
import Column from "@/components/common/layout/column.vue";
import { Gap } from "@/components/common/layout/gap";
import { useKeycloak } from "@josempgon/vue-keycloak";
import { useTemplateRef } from "vue";
import Preferences from "@/features/profile/components/preferences/preferences.vue";
import Loading from "@/components/common/states/loading.vue";
import Boundary from "@/components/common/states/boundary.vue";
import { getFullName } from "@/lib/name";
import { useProfile as useProfileStore } from "@/stores/profile";
import { ref } from "vue";
import Empty from "@/components/common/states/empty.vue";
import { watchEffect } from "vue";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const keycloak = useKeycloak();
const store = useProfileStore();
const { profile, error, loading } = storeToRefs(store);
onMounted(async () => await store.fetch());

const boundary = useTemplateRef<InstanceType<typeof Boundary>>("boundary");
watchEffect(() => error.value && boundary.value?.capture(error.value));

const preferences = ref(false);

function logout() {
    if (!keycloak.keycloak.value) return;
    keycloak.keycloak.value.logout();
}
</script>

<template>
    <Base>
        <Boundary ref="boundary">
            <Loading v-if="loading" />
            <Empty v-else-if="!profile" message="No profile found!" />

            <Column v-else :gap="Gap.EXTRA_LARGE">
                <Information
                    :name="getFullName(profile.firstName, profile.lastName)"
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
                        privacy: profile.isPrivate ? 'private' : 'public',
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
                    @saved="
                        () => {
                            store.fetch();
                            preferences = false;
                        }
                    "
                />
            </Column>
        </Boundary>
    </Base>
</template>
