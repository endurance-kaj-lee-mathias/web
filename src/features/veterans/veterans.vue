<script setup lang="ts">
import Base from "@/components/layout/base.vue";
import Information from "@/features/profile/components/information.vue";
import { Viewer } from "@/features/profile/components/viewer";
import Introduction from "@/features/profile/components/introduction.vue";
import Column from "@/components/common/layout/column.vue";
import { Tabs } from "@/features/veterans/tabs";
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
import Row from "@/components/common/tabs/row.vue";
import Search from "@/features/veterans/components/search.vue";

const tab = ref(Tabs.VETERANS);
</script>

<template>
    <Base>
        <Error>
            <Column :gap="Gap.EXTRA_LARGE">
                <Row
                    :titles="Object.values(Tabs)"
                    :current="tab"
                    :navigate="(title: string) => (tab = title as Tabs)"
                />

                <Column v-if="tab === Tabs.VETERANS">
                    <Search />
                </Column>
                <Column v-if="tab === Tabs.REQUESTS"> Requests </Column>
            </Column>
        </Error>
    </Base>
</template>
