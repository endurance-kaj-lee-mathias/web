import type { RuleId } from "@/features/network/connections/models/id";

export interface Rule {
    id?: RuleId;
    resource: Resource;
    effect: Effect;
}

export enum Resource {
    PROFILE = "userProfile",
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
