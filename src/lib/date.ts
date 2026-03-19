export function relativeDate(value: Date | string | number): string {
    const date = new Date(value);
    if (isNaN(date.getTime())) throw new Error("Invalid date");

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return "just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 365) return `${days}d ago`;

    const years = Math.floor(days / 365);
    return `${years} year${years !== 1 ? "s" : ""} ago`;
}
