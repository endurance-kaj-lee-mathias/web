<script setup lang="ts">
import Base from "@/components/layout/base.vue";
import Information from "@/features/profile/components/information.vue";
import { Viewer } from "@/features/profile/components/viewer";
import Introduction from "@/features/profile/components/introduction.vue";
import Column from "@/components/common/layout/column.vue";
import { Gap } from "@/components/common/layout/gap";
import { useKeycloak } from "@josempgon/vue-keycloak";
import { onMounted, useTemplateRef } from "vue";
import { ref } from "vue";
import Preferences from "@/features/profile/components/preferences/preferences.vue";
import Loading from "@/components/common/states/loading.vue";
import Error from "@/components/common/states/error.vue";
import { getFullName } from "@/lib/name";
import { useProfile } from "@/stores/profile";

const keycloak = useKeycloak();
const store = useProfile();
const boundary = useTemplateRef<InstanceType<typeof Error>>("boundary");
const preferences = ref(false);

onMounted(async () => await fetch());

async function fetch() {
    try {
        await store.fetch();
    } catch (error: unknown) {
        boundary.value!.error = error as Error;
    }
}

function logout() {
    if (!keycloak.keycloak.value) return;
    keycloak.keycloak.value.logout();
}
</script>

<template>
    <Base>
        <Error ref="boundary">
            <Loading v-if="!store.profile" />

            <Column v-else :gap="Gap.EXTRA_LARGE">
                <Information
                    :name="
                        getFullName(
                            store.profile.firstName,
                            store.profile.lastName,
                        )
                    "
                    :username="store.profile.username"
                    :about="store.profile.about"
                    :image="store.profile.image"
                    :preferences="() => (preferences = true)"
                    :logout="logout"
                    :viewer="Viewer.OWNER"
                />

                <Introduction
                    :username="store.profile.username"
                    :introduction="store.profile.introduction"
                />

                <Preferences
                    v-model="preferences"
                    :personal="{
                        firstName: store.profile.firstName,
                        lastName: store.profile.lastName,
                        username: store.profile.username,
                        phoneNumber: store.profile.phoneNumber,
                    }"
                    :address="{
                        street: store.profile.address.street,
                        locality: store.profile.address.locality,
                        postalCode: store.profile.address.postalCode,
                        region: store.profile.address.region,
                        country: store.profile.address.country,
                    }"
                    :about="{
                        about: store.profile.about,
                        introduction: store.profile.introduction,
                    }"
                    @saved="fetch"
                />
            </Column>
        </Error>
    </Base>
</template>
