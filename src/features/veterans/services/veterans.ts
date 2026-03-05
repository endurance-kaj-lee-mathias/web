import { Env } from "@/lib/env";
import { client } from "@/lib/auth/client";

const api = client(Env.apiUrl);

export async function send(username: string): Promise<void> {
    try {
        await api.post("/support/invites", {
            username,
        });
    } catch {
        throw new Error("Request could not be sent");
    }
}
