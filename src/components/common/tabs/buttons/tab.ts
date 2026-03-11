import type { Component } from "vue";

export interface Tab {
    title: string;
    component: Component;
    props?: Record<string, unknown>;
}
