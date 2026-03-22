import type { Ref } from "vue";

export function move(day: Ref<Date>, pages: { month: number; year: number }[]) {
    const page = pages[0];
    if (!page) return;

    if (
        day.value.getMonth() + 1 === page.month &&
        day.value.getFullYear() === page.year
    )
        return;

    const daysInMonth = new Date(page.year, page.month, 0).getDate();
    const clampedDay = Math.min(day.value.getDate(), daysInMonth);
    day.value = new Date(page.year, page.month - 1, clampedDay);
}
