<script setup lang="ts">
import Base from "@/components/layout/base.vue";
import Centered from "@/components/layout/centered.vue";
import Button from "@/components/common/buttons/button.vue";
import { useKeycloak } from "@josempgon/vue-keycloak";

const keycloak = useKeycloak();
</script>

<template>
    <Base>
        <Centered> Account <Button>Log out</Button> </Centered>
    </Base>
</template>
