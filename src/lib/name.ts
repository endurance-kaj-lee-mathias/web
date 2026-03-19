export function getFullName(firstName: string, lastName: string) {
    return `${firstName} ${lastName}`;
}

export function getCapitalized(name: string) {
    return `${name.substring(0, 1).toUpperCase()}${name.substring(1)}`;
}
