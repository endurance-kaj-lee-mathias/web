import { waitForKeycloak } from "@/lib/auth/token";
import { onMounted, onUnmounted } from "vue";

export function usePolling(callback: () => void | Promise<void>, ms: number) {
    let interval: number | undefined;

    onMounted(async () => {
        await waitForKeycloak();
        await callback();
        interval = window.setInterval(callback, ms);
    });

    onUnmounted(() => {
        if (interval === undefined) return;
        clearInterval(interval);
    });
}
