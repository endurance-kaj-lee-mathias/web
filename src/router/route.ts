import type { Component } from "vue";
import type { Role } from "@/models/roles";

export interface Route {
    icon?: Component;
    title?: string;
    path: string;
    component: Component;
    redirect?: string;
    visible: Visibility;
    auth: {
        guarded: Guarded;
        roles?: Role[];
    };
}

export enum Guarded {
    PUBLIC,
    ONLY_PUBLIC,
    PRIVATE,
}

export enum Visibility {
    BAR,
    ICON,
    NONE,
}
