import type { ProfileId } from "@/features/profile/models/id";

export interface Profile {
    id: ProfileId;
    name: string;
    username: string;
    about: string;
    introduction: string;
    image: string;
}
