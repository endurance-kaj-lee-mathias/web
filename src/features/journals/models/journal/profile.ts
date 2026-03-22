import type { RiskLevel } from "@/features/journals/models/journal/risk";

export interface Profile {
    firstName: string;
    lastName: string;
    username: string;
    about: string;
    introduction: string;
    image: string;
    phoneNumber?: string;
    isPrivate: boolean;
    riskLevel: RiskLevel;
}
