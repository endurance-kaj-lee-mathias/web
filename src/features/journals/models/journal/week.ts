import type { Day } from "@/features/journals/models/journal/day";

export interface Week {
    days: Day[];
    totalWeeks: number;
    week: number;
}
