<script lang="ts" setup>
import { Dialog, DialogContent } from "@/components/common/dialog/dialog";
import Column from "@/components/common/layout/column.vue";
import Loading from "@/components/common/states/loading.vue";
import Boundary from "@/components/common/states/boundary.vue";
import { useTemplateRef } from "vue";
import { watch } from "vue";
import type { Veteran } from "@/features/veterans/veterans/models/veteran";
import type {
    Effect,
    Resource,
} from "@/features/veterans/veterans/models/rule";
import Add from "@/features/veterans/veterans/components/privacy/add.vue";
import { watchEffect } from "vue";
import { useRules } from "@/features/veterans/veterans/composables/use-rules";
import Empty from "@/components/common/states/empty.vue";
import Rule from "@/features/veterans/veterans/components/privacy/rule.vue";
import { onMounted } from "vue";
import {
    add as addRule,
    remove as removeRule,
} from "@/features/veterans/veterans/services/rules";
import Seperator from "@/components/common/seperator.vue";
import type { RuleId } from "../../models/id";
import Button from "@/components/common/buttons/button.vue";

const props = defineProps<{
    modelValue: boolean;
    veteran: Veteran;
}>();

const boundary = useTemplateRef<InstanceType<typeof Boundary>>("boundary");
const { rules, loading, error, fetch } = useRules(props.veteran.id);
watchEffect(() => error.value && boundary.value?.capture(error.value));
const emit = defineEmits(["update:modelValue", "saved"]);

watch(
    () => props.modelValue,
    (value, old) => {
        if (!old || value) return;
    },
);

onMounted(async () => await fetch());

async function save(resource: Resource, effect: Effect) {
    try {
        await addRule(props.veteran.id, resource, effect);
        await fetch();
        boundary.value!.error = null;
    } catch (error: unknown) {
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
            title="Privacy"
            :description="`For @${veteran.username}`"
            :footer="true"
            :closeable="true"
        >
            <Boundary ref="boundary">
                <Column>
                    <Loading v-if="loading || !rules" />

                    <Column v-else>
                        <Empty
                            v-if="rules.length <= 0"
                            message="No rules found"
                        />

                        <Column v-else>
                            <Rule
                                v-for="rule in rules"
                                :username="veteran.username"
                                :resource="rule.resource"
                                :effect="rule.effect"
                            />
                        </Column>
                    </Column>
                </Column>
            </Boundary>

            <template v-slot:footer>
                <Button>Save</Button>
            </template>
        </DialogContent>
    </Dialog>
</template>
