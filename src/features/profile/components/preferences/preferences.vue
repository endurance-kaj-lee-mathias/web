<script lang="ts" setup>
import Button from "@/components/common/buttons/button.vue";
import { Dialog, DialogContent } from "@/components/common/dialog/dialog";
import Column from "@/components/common/layout/column.vue";
import { Gap } from "@/components/common/layout/gap";
import Loading from "@/components/common/states/loading.vue";
import Row from "@/components/common/tabs/buttons/row.vue";
import About from "@/features/profile/components/preferences/about.vue";
import Address from "@/features/profile/components/preferences/address.vue";
import Personal from "@/features/profile/components/preferences/personal.vue";
import Privacy from "@/features/profile/components/preferences/privacy.vue";
import { Tabs } from "@/features/profile/components/preferences/tabs";
import type { About as AboutModel } from "@/features/profile/models/about";
import type { Address as AddressModel } from "@/features/profile/models/address";
import type { Personal as PersonalModel } from "@/features/profile/models/personal";
import { changeProfile } from "@/features/profile/services/profile";
import Boundary from "@/components/common/states/boundary.vue";
import { useTemplateRef } from "vue";
import { ref } from "vue";
import { watch } from "vue";

const props = defineProps<{
    modelValue: boolean;
    personal: PersonalModel;
    address: AddressModel;
    about: AboutModel;
}>();

const boundary = useTemplateRef<InstanceType<typeof Boundary>>("boundary");
const emit = defineEmits(["update:modelValue", "saved"]);
const loading = ref(false);

const tab = ref(Tabs.PERSONAL);
const personal = ref({ ...props.personal });
const address = ref({ ...props.address });
const about = ref({ ...props.about });

watch(
    () => props.modelValue,
    (value, old) => {
        if (!old || value) return;
        tab.value = Tabs.PERSONAL;
    },
);

async function save() {
    try {
        loading.value = true;
        await changeProfile(personal.value, address.value, about.value);
        emit("saved");
        loading.value = false;
    } catch (error: unknown) {
        loading.value = false;
        boundary.value!.error = error as Error;
    }
}
</script>

<template>
    <Dialog
        :open="modelValue"
        @update:open="$emit('update:modelValue', $event)"
    >
        <DialogContent
            title="Preferences"
            description="Edit your profile details"
            :footer="true"
            :closeable="true"
        >
            <Boundary ref="boundary">
                <Loading v-if="loading" />

                <Column v-else :gap="Gap.LARGE">
                    <Row
                        :titles="Object.values(Tabs)"
                        :current="tab"
                        :navigate="(title: string) => (tab = title as Tabs)"
                    />

                    <Personal
                        v-if="tab === Tabs.PERSONAL"
                        v-model:values="personal"
                    />
                    <Address
                        v-if="tab === Tabs.ADDRESS && props.address"
                        v-model:values="address"
                    />
                    <About v-if="tab === Tabs.ABOUT" v-model:values="about" />
                    <Privacy v-if="tab === Tabs.PRIVACY" />
                </Column>
            </Boundary>

            <template v-slot:footer>
                <Button @click="save">Save</Button>
            </template>
        </DialogContent>
    </Dialog>
</template>
