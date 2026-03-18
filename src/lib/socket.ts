import { Env } from "@/lib/env";
import { getToken, waitForKeycloak } from "@/lib/auth/token";

type MessageHandler = (data: unknown) => void;

export async function createClient(endpoint: string) {
    await waitForKeycloak();

    const token = await getToken();
    if (!token) throw new Error("No auth token available");

    const socket = new WebSocket(`${Env.wsUrl}/${endpoint}`, [token]);

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
        let message;

        try {
            message = JSON.parse(event.data);
        } catch {
            throw new Error("Could not parse incoming message");
        }

        const channelHandlers = handlers.get(message.channel);
        rawHandlers.forEach((h) => h(message));

        if (!channelHandlers) return;
        channelHandlers.forEach((h) => h(message.payload));
    });

    const rawHandlers = new Set<MessageHandler>();

    function onMessage(handler: MessageHandler) {
        rawHandlers.add(handler);
        return () => rawHandlers.delete(handler);
    }

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

    return { subscribe, onMessage, close };
}
