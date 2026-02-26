export interface Address {
    street: string;
    number: number;
    addition: string;
    city: string;
    zip: number;
    country: string;
}

export function from() {
    return {
        street: "",
        number: 0,
        addition: "",
        zip: 0,
        city: "",
        country: "",
    } as Address;
}
