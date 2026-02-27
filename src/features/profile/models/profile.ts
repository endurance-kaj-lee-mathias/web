import type { ProfileId } from "@/features/profile/models/id";
import type { Address } from "@/features/profile/models/address";

export interface Profile {
    id: ProfileId;
    firstName: string;
    lastName: string;
    userName: string;
    about: string;
    introduction: string;
    image: string;
    address: Address;
}
