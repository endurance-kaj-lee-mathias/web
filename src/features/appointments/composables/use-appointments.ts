import type { Appointment } from "@/features/appointments/models/appointment/appointment";
import { getAll } from "@/features/appointments/services/appointments";
import { ref } from "vue";

export function useAppointments(day: Date | null) {
    const appointments = ref(null as Appointment[] | null);
    const loading = ref(false);
    const error = ref<Error | null>(null);

    async function fetch(day: Date | null, initial?: boolean) {
        if (!day) return;

        try {
            if (initial) loading.value = true;
            appointments.value = await getAll(day);
            error.value = null;
        } catch (err) {
            if (!(err instanceof Error)) return;
            error.value = err as Error;
        } finally {
            if (!initial) return;
            loading.value = false;
        }
    }

    return { appointments, loading, error, fetch };
}
