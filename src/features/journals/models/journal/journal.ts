import type { Profile } from "@/features/journals/models/journal/profile";
import type { Stress } from "@/features/journals/models/journal/stress";
import type { Mood } from "@/features/journals/models/journal/mood";
import type { Paginated } from "@/models/pagination";
import type { VeteranId } from "@/features/journals/models/veteran/id";

export interface Journal {
    veteranId: VeteranId;
    profile: Profile;
    stressScores?: Paginated<Stress>;
    moodEntries?: Paginated<Mood>;
}
