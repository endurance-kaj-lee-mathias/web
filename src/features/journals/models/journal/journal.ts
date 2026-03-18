import type { Profile } from "@/features/journals/models/journal/profile";
import type { VeteranId } from "@/features/journals/models/veteran/id";
import type { Week } from "@/features/journals/models/journal/week";

export interface Journal {
    veteranId: VeteranId;
    profile: Profile;
    weekly: Week;
}
