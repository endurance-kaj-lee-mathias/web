import type { ProfileId } from "@/features/profile/models/id";
import type { Address } from "@/features/profile/models/address";
import type { Resource, Rule } from "@/features/profile/models/rule";

export interface Profile {
    id: ProfileId;
    firstName: string;
    lastName: string;
    username: string;
    phoneNumber: string;
    about: string;
    introduction: string;
    image: string;
    address: Address;
    sharingResources: Rule[];
}
