import { createRouter, createWebHistory } from "vue-router";
import Message from "@/features/message/message.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [{ path: "/", component: Message }],
});

export default router;
