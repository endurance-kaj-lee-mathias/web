import type { VeteranId } from "@/features/journals/models/veteran/id";

export interface Veteran {
    id: VeteranId;
    firstName: string;
    lastName: string;
    username: string;
    image: string;
    lastUpdatedAt: Date;
    latestScore: number;
}
