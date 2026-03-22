<script setup lang="ts">
import { DatePicker } from "v-calendar";
</script>

<template>
    <DatePicker color="gray" :expanded="true" :borderless="true" />
</template>

<style lang="postcss">
.vc-pane-container {
    font-family: "Nunito" !important;
    background-color: var(--color-light-2);
    border-radius: var(--radius-lg);
}

.vc-highlight {
    display: none;
}

.vc-nav-item {
    color: var(--color-medium);
    background-color: var(--color-light-2);
}

.vc-nav-item.is-active {
    background-color: var(--color-accent) !important;
    color: var(--color-light-2);
}

.vc-nav-item:hover {
    background-color: var(--color-medium-3) !important;
    transition: background-color 75ms;
}

.vc-nav-item:focus,
.vc-nav-item.vc-focus {
    outline: none !important;
    box-shadow: none !important;
}

.vc-day-content.vc-focus {
    outline: none;
    box-shadow: none;
    border-radius: var(--radius-lg);
}

.vc-day-content:hover[tabindex="-1"] {
    background-color: var(--color-medium-3) !important;
    transition: background-color 75ms;
}

.vc-day-content[tabindex="0"] {
    background-color: var(--color-accent);
    color: var(--color-light-2);
}

.vc-day-content[tabindex="0"]:hover {
    background-color: var(--color-accent);
}

.vc-base-icon {
    color: var(--color-medium);
}

.vc-arrow:hover {
    background-color: var(--color-medium-3) !important;
    transition: background-color 75ms;
}

.vc-arrow.vc-focus {
    outline: none;
    box-shadow: none;
}

.vc-nav-arrow:hover {
    background-color: var(--color-medium-3) !important;
    transition: background-color 75ms;
}

.vc-nav-arrow.vc-focus {
    outline: none;
    box-shadow: none;
}

.vc-nav-title:hover {
    background-color: var(--color-medium-3) !important;
    transition: background-color 75ms;
}

.vc-nav-title.vc-focus {
    outline: none;
    box-shadow: none;
}
</style>
