import JournalIcon from "@/components/icons/journal.vue";
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
];
