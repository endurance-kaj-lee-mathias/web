<script lang="ts" setup>
import Button from "@/components/common/buttons/button.vue";
import { Dialog, DialogContent } from "@/components/common/dialog/dialog";
import { ref } from "vue";
import { Tabs } from "@/features/profile/components/preferences/tabs";
import Row from "@/components/common/tabs/row.vue";
import Column from "@/components/common/layout/column.vue";
import Personal from "@/features/profile/components/preferences/personal.vue";
import About from "@/features/profile/components/preferences/about.vue";
import Privacy from "@/features/profile/components/preferences/privacy.vue";
import { Gap } from "@/components/common/layout/gap";
import { watch } from "vue";
import Address from "@/features/profile/components/preferences/address.vue";

const props = defineProps<{
    modelValue: boolean;
    personal: {
        firstName: string;
        lastName: string;
        userName: string;
        phone: string;
    };
    address: {
        street: string;
        number: number;
        city: string;
        zip: number;
        country: string;
    };
    about: { about: string; introduction: string };
    save: (about: string, introduction: string) => void;
}>();

const tab = ref(Tabs.PERSONAL);
const emit = defineEmits(["update:modelValue"]);
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
        >
            <Column :gap="Gap.LARGE">
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

            <template v-slot:footer>
                <Button @click="() => save(about.about, about.introduction)"
                    >Save</Button
                >
            </template>
        </DialogContent>
    </Dialog>
</template>
