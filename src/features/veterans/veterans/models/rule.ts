import type { RuleId } from "@/features/veterans/veterans/models/id";

export interface Rule {
    id?: RuleId;
    resource: Resource;
    effect: Effect;
}

export enum Resource {
    PROFILE = "userProfile",
    STRESS = "stressScores",
    MOOD = "moodEntries",
    CALENDAR = "calendar",
}

export enum Effect {
    ALLOW = "allow",
    DENY = "deny",
}

export function formatResource(resource: Resource) {
    switch (resource) {
        case Resource.PROFILE:
            return "Profile";
        case Resource.STRESS:
            return "Stress";
        case Resource.MOOD:
            return "Mood";
        case Resource.CALENDAR:
            return "Calendar";
    }
}

export function formatEffect(effect: Effect) {
    switch (effect) {
        case Effect.ALLOW:
            return "Allow";
        case Effect.DENY:
            return "Deny";
    }
}
