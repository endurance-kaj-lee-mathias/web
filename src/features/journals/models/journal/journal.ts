import type { Profile } from "@/features/journals/models/journal/profile";
import type { Stress } from "@/features/journals/models/journal/stress";
import type { Mood } from "@/features/journals/models/journal/mood";
import type { Paginated } from "@/models/pagination";

export interface Journal {
    veteranId: string;
    profile: Profile;
    stressScores?: Paginated<Stress>;
    moodEntries?: Paginated<Mood>;
}
