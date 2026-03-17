import type { Tab } from "@/components/common/tabs/links/tab";

export function getTabs(username: string): Tab[] {
    return [
        { title: "Info", href: `/journals/${username}` },
        { title: "Stress", href: `/journals/${username}/stress` },
        { title: "Mood", href: `/journals/${username}/mood` },
    ];
}
