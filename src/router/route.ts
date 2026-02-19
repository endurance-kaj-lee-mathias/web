import type { Component } from "vue";
import type { Role } from "@/lib/auth/roles";

export interface Route {
    icon: Component;
    title: string;
    path: string;
    component: Component;
    visible?: boolean;
    auth: {
        guarded: boolean;
        roles?: Role[];
    };
}
