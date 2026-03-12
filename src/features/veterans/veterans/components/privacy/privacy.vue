<script lang="ts" setup>
import { Dialog, DialogContent } from "@/components/common/dialog/dialog";
import Column from "@/components/common/layout/column.vue";
import Loading from "@/components/common/states/loading.vue";
import Boundary from "@/components/common/states/boundary.vue";
import { useTemplateRef } from "vue";
import { watch } from "vue";
import type { Veteran } from "@/features/veterans/veterans/models/veteran";
import {
    Effect,
    formatEffect,
    formatResource,
    type Rule,
} from "@/features/veterans/veterans/models/rule";
import { watchEffect } from "vue";
import { useRules } from "@/features/veterans/veterans/composables/use-rules";
import Empty from "@/components/common/states/empty.vue";
import { onMounted } from "vue";
import { save as saveRule } from "@/features/veterans/veterans/services/rules";
import Button from "@/components/common/buttons/button.vue";
import { ref } from "vue";
import Select from "@/components/common/inputs/select.vue";

const props = defineProps<{
    modelValue: boolean;
    veteran: Veteran;
}>();

const boundary = useTemplateRef<InstanceType<typeof Boundary>>("boundary");
const { rules, loading, error, fetch } = useRules(props.veteran.id);
const pending = ref([] as Rule[]);
watchEffect(() => error.value && boundary.value?.capture(error.value));
const emit = defineEmits(["update:modelValue", "saved"]);

watch(
    () => props.modelValue,
    (value, old) => {
        if (!old || value) return;
    },
);

onMounted(async () => await fetch());

function save(rule: Rule) {
    const index = pending.value.findIndex((p) => p.resource === rule.resource);

    if (index >= 0) {
        pending.value[index] = rule;
        return;
    }

    pending.value.push(rule);
}

async function savePending() {
    try {
        await Promise.all(
            pending.value!.map((rule: Rule) =>
                saveRule(props.veteran.id, rule.resource, rule.effect),
            ),
        );
        await fetch();
        boundary.value!.error = null;
        emit("saved");
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
                            <Select
                                v-for="rule in rules"
                                :label="formatResource(rule.resource)"
                                :description="`Can @${veteran.username} take a look at your ${formatResource(rule.resource).toLowerCase()}?`"
                                :modelValue="rule.effect"
                                @update:modelValue="
                                    save({
                                        ...rule,
                                        effect: $event as Effect,
                                    })
                                "
                            >
                                <option
                                    v-for="effect in Object.values(Effect)"
                                    :value="effect"
                                >
                                    {{ formatEffect(effect) }}
                                </option>
                            </Select>
                        </Column>
                    </Column>
                </Column>
            </Boundary>

            <template v-slot:footer>
                <Button @click="savePending">Save</Button>
            </template>
        </DialogContent>
    </Dialog>
</template>
