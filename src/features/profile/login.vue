<script setup lang="ts">
import Base from "@/components/layout/base.vue";
import { useKeycloak } from "@josempgon/vue-keycloak";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

onMounted(() => {
    const keycloak = useKeycloak();
    const router = useRouter();

    if (keycloak.isPending || keycloak.isAuthenticated) router.push("/account");
    keycloak.keycloak.value?.login();
});
</script>

<template>
    <Base> Redirecting to login... </Base>
</template>
