import { useRoute } from "vue-router";

export function getParam(name: string): string {
    const route = useRoute();
    const param = route.params[name];

    if (param === undefined || param[0] === undefined)
        throw new Error("Param was not found");

    return param as string;
}
