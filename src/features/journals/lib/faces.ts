const faces = [
    "crying-face",
    "worried-face",
    "disappointed-face",
    "confused-face",
    "pensive-face",
    "neutral-face",
    "slightly-smiling-face",
    "smiling-face",
    "grinning-face",
    "beaming-face",
    "star-struck",
];

export function getFace(score: number) {
    return faces[Math.round(score)];
}
