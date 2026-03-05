export interface Address {
    street: string;
    locality: string;
    postalCode: number;
    region: string;
    country: string;
}

export function matches(a: Address, b: Address): boolean {
    return (
        a.street === b.street &&
        a.locality === b.locality &&
        a.postalCode === b.postalCode &&
        a.region === b.region &&
        a.country === b.country
    );
}
