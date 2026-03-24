export interface Rule {
    resource: Resource;
    isPrivate: boolean;
}

export enum Resource {
    PROFILE = "userProfile",
    CALENDAR = "calendar",
}

export function formatResource(resource: Resource) {
    switch (resource) {
        case Resource.PROFILE:
            return "Profile";
        case Resource.CALENDAR:
            return "Calendar";
    }
}
