import { Env } from "@/lib/env";

type MessageHandler = (data: unknown) => void;

export function createClient() {
    const socket = new WebSocket(`${Env.wsUrl}/ws`);

    function send(payload: object) {
        const data = JSON.stringify(payload);

        if (socket.readyState === WebSocket.OPEN) {
            socket.send(data);
            return;
        }

        socket.addEventListener("open", () => socket.send(data), {
            once: true,
        });
    }

    function subscribe(channel: string, handler: MessageHandler) {
        send({ type: "subscribe", channel });

        const listener = (event: MessageEvent) => {
            const msg = JSON.parse(event.data);
            if (msg.channel === channel) handler(msg.payload);
        };

        socket.addEventListener("message", listener);

        return () => {
            send({ type: "unsubscribe", channel });
            socket.removeEventListener("message", listener);
        };
    }

    function close() {
        socket.close();
    }

    return { subscribe, close };
}
