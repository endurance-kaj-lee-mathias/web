import ProfileIcon from "@/components/icons/profile.vue";
import Profile from "@/features/profile/profile.vue";
import { Guarded, Visibility, type Route } from "@/router/route";

export const profile: Route[] = [
    {
        icon: ProfileIcon,
        title: "Profile",
        path: "/profile",
        visible: Visibility.BAR,
        component: Profile,
        auth: { guarded: Guarded.PRIVATE },
    },
];
