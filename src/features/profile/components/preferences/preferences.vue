<script lang="ts" setup>
import Button from "@/components/common/buttons/button.vue";
import { Dialog, DialogContent } from "@/components/common/dialog/dialog";
import Column from "@/components/common/layout/column.vue";
import { Gap } from "@/components/common/layout/gap";
import Row from "@/components/common/tabs/row.vue";
import About from "@/features/profile/components/preferences/about.vue";
import Address from "@/features/profile/components/preferences/address.vue";
import Personal from "@/features/profile/components/preferences/personal.vue";
import Privacy from "@/features/profile/components/preferences/privacy.vue";
import { Tabs } from "@/features/profile/components/preferences/tabs";
import type { Personal as PersonalModel } from "@/features/profile/models/personal";
import type { About as AboutModel } from "@/features/profile/models/about";
import { ref, useTemplateRef, watch } from "vue";
import type { Address as AddressModel } from "@/features/profile/models/address";
import { changeProfile } from "@/features/profile/services/profile";
import { reactive } from "vue";
import Loading from "@/components/common/states/loading.vue";
import Error from "@/components/common/states/error.vue";

const props = defineProps<{
    modelValue: boolean;
    personal: PersonalModel;
    address: AddressModel;
    about: AboutModel;
}>();

const boundary = useTemplateRef<InstanceType<typeof Error>>("boundary");
const emit = defineEmits(["update:modelValue", "saved"]);
const state = reactive({
    loading: false,
});

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
        state.loading = true;
        await changeProfile(personal.value, address.value, about.value);
        emit("saved");
        state.loading = false;
    } catch (error: unknown) {
        state.loading = false;
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
            <Error ref="boundary">
                <Loading v-if="state.loading" />

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
            </Error>

            <template v-slot:footer>
                <Button @click="save">Save</Button>
            </template>
        </DialogContent>
    </Dialog>
</template>
