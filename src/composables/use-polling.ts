import { waitForKeycloak } from "@/lib/auth/token";
import { onMounted, onUnmounted } from "vue";

export function usePolling(
    callback: (initial?: boolean) => void | Promise<void>,
    ms: number,
) {
    let interval: number | undefined;

    onMounted(async () => {
        await waitForKeycloak();
        await callback(true);
        interval = window.setInterval(() => callback(false), ms);
    });

    onUnmounted(() => {
        if (interval === undefined) return;
        clearInterval(interval);
    });
}
