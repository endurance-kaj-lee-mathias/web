import { Env } from "@/lib/env";
import type { Profile } from "@/features/profile/models/profile";
import { client } from "@/lib/auth/client";
import { type Personal } from "@/features/profile/models/personal";
import type { About } from "@/features/profile/models/about";
import { type Address, matches } from "@/features/profile/models/address";
import { type Privacy } from "@/features/profile/models/privacy";
import { Resource, type Rule } from "@/features/profile/models/rule";

const api = client(Env.apiUrl);

export async function getOrCreate(): Promise<Profile> {
    try {
        const { data } = await api.get<Profile>("/users/me");
        return data;
    } catch {
        throw new Error("Profile could not be fetched");
    }
}

export function getRule(resource: Resource, rules: Rule[]): Rule {
    return (
        rules.find((rule: Rule) => rule.resource === resource) ??
        ({ resource, isPrivate: true } as Rule)
    );
}

export async function changeProfile(
    personal: Personal,
    address: Address,
    about: About,
    privacy: Privacy,
): Promise<void> {
    try {
        const profile: Profile = await getOrCreate();

        await Promise.all([
            changePrivacy(profile.sharingResources, privacy),
            changeFirstName(profile.firstName, personal.firstName),
            changeLastName(profile.lastName, personal.lastName),
            changePhoneNumber(profile.phoneNumber, personal.phoneNumber),
            changeAddress(profile.address, address),
            changeAbout(profile.about, about.about),
            changeIntroduction(profile.introduction, about.introduction),
        ]);
    } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
        throw new Error("Could not update profile");
    }
}

async function changePrivacy(old: Rule[], model: Privacy): Promise<void> {
    try {
        if (!getRule(Resource.PROFILE, old).isPrivate === model.userProfile) {
            await api.patch("/sharing/resources/userProfile/privacy", {
                IsPrivate: model.userProfile,
            });
        }

        if (!getRule(Resource.CALENDAR, old).isPrivate === model.calendar) {
            await api.patch("/sharing/resources/calendar/privacy", {
                IsPrivate: model.calendar,
            });
        }
    } catch {
        throw new Error("Profile privacy could not be updated");
    }
}

async function changeFirstName(old: string, model: string): Promise<void> {
    try {
        if (old === model) return;
        await api.patch("/users/me/first-name", {
            firstName: model,
        });
    } catch {
        throw new Error("First name could not be updated");
    }
}

async function changeLastName(old: string, model: string): Promise<void> {
    try {
        if (old === model) return;
        await api.patch("/users/me/last-name", {
            lastName: model,
        });
    } catch {
        throw new Error("Last name could not be updated");
    }
}

async function changePhoneNumber(old: string, model: string): Promise<void> {
    try {
        if (old === model) return;
        await api.patch("/users/me/phone-number", {
            phoneNumber: model,
        });
    } catch {
        throw new Error("Phone number could not be updated");
    }
}

async function changeAddress(old: Address, model: Address): Promise<void> {
    try {
        if (matches(old, model)) return;
        await api.patch("/users/me/address", model);
    } catch {
        throw new Error("Address could not be updated");
    }
}

async function changeAbout(old: string, model: string): Promise<void> {
    try {
        if (old === model) return;
        await api.patch("/users/me/about", {
            about: model,
        });
    } catch {
        throw new Error("About could not be updated");
    }
}

async function changeIntroduction(old: string, model: string): Promise<void> {
    try {
        if (old === model) return;
        await api.patch("/users/me/introduction", {
            introduction: model,
        });
    } catch {
        throw new Error("Introduction could not be updated");
    }
}
