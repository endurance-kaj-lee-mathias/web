export interface Address {
    street: string;
    number: number;
    city: string;
    zip: number;
    country: string;
}

export function from() {
    return {
        street: "",
        number: 0,
        zip: 0,
        city: "",
        country: "",
    } as Address;
}
