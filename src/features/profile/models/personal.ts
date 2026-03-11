export interface Personal {
    firstName: string;
    lastName: string;
    username: string;
    phoneNumber: string;
    privacy: Privacy;
}

export enum Privacy {
    PUBLIC = "public",
    PRIVATE = "private",
}
