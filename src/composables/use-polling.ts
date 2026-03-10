import { onMounted, onUnmounted } from "vue";

export function usePolling(
    callback: () => void | Promise<void>,
    intervalMs: number,
) {
    let interval: number | undefined;

    onMounted(async () => {
        await callback();
        interval = window.setInterval(callback, intervalMs);
    });

    onUnmounted(() => {
        if (interval === undefined) return;
        clearInterval(interval);
    });
}
