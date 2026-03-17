import { Env } from "@/lib/env";
import { getToken, waitForKeycloak } from "@/lib/auth/token";

type MessageHandler = (data: unknown) => void;

export async function createClient() {
    await waitForKeycloak();

    const token = await getToken();
    if (!token) throw new Error("No auth token available");

    const socket = new WebSocket(`${Env.wsUrl}/ws`, [token]);

    const queue: string[] = [];

    function flushQueue() {
        while (queue.length && socket.readyState === WebSocket.OPEN) {
            socket.send(queue.shift()!);
        }
    }

    socket.addEventListener("open", flushQueue);

    function send(payload: object) {
        const data = JSON.stringify(payload);

        if (socket.readyState === WebSocket.OPEN) {
            socket.send(data);
        } else {
            queue.push(data);
        }
    }

    const handlers = new Map<string, Set<MessageHandler>>();

    socket.addEventListener("message", (event) => {
        let msg;
        try {
            msg = JSON.parse(event.data);
        } catch {
            return;
        }

        const channelHandlers = handlers.get(msg.channel);
        if (!channelHandlers) return;

        for (const h of channelHandlers) {
            h(msg.payload);
        }
    });

    function subscribe(channel: string, handler: MessageHandler) {
        if (!handlers.has(channel)) {
            handlers.set(channel, new Set());
            send({ type: "subscribe", channel });
        }

        handlers.get(channel)!.add(handler);

        return () => {
            const set = handlers.get(channel);
            if (!set) return;

            set.delete(handler);

            if (set.size === 0) {
                handlers.delete(channel);
                send({ type: "unsubscribe", channel });
            }
        };
    }

    function close() {
        socket.close();
    }

    socket.addEventListener("close", () => {
        console.warn("WebSocket closed");
    });

    return { subscribe, close };
}
