import JournalIcon from "@/components/icons/journal.vue";
import Journal from "@/features/journals/journal.vue";
import Journals from "@/features/journals/journals.vue";
import { Guarded, Visibility, type Route } from "@/router/route";

export const journals: Route[] = [
    {
        icon: JournalIcon,
        title: "Journals",
        path: "/journals",
        visible: Visibility.BAR,
        component: Journals,
        auth: { guarded: Guarded.PRIVATE },
    },
    {
        path: "/journals/:username",
        visible: Visibility.NONE,
        component: Journal,
        auth: { guarded: Guarded.PRIVATE },
    },
];
