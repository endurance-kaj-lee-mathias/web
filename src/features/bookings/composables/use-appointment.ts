import { usePolling } from "@/composables/use-polling";
import type { Appointment } from "@/features/bookings/models/appointment";
import type { AppointmentId } from "@/features/bookings/models/id";
import { get } from "@/features/bookings/services/bookings";
import { POLLING_RATE } from "@/lib/polling";
import { ref } from "vue";

export function useAppointment(id: AppointmentId) {
    const appointment = ref(null as Appointment | null);
    const loading = ref(false);
    const error = ref<Error | null>(null);

    async function fetch(initial?: boolean) {
        try {
            if (initial) loading.value = true;
            appointment.value = await get(id);
            error.value = null;
        } catch (err) {
            if (!(err instanceof Error)) return;
            error.value = err as Error;
        } finally {
            if (!initial) return;
            loading.value = false;
        }
    }

    usePolling(fetch, POLLING_RATE);
    return { appointment, loading, error, fetch };
}
