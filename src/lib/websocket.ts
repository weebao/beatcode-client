// websocket.ts
import { writable, type Writable } from "svelte/store";

const RETRIES = 3;

export interface WebSocketMessage {
    event: string;
    data: any;
}

export function createWebSocket(url: string) {
    const messages: Writable<WebSocketMessage | null> = writable(null);
    const status: Writable<"CONNECTING" | "OPEN" | "CLOSING" | "CLOSED"> = writable("CONNECTING");
    let socket: WebSocket;
    let retries = RETRIES;

    function connect() {
        socket = new WebSocket(url);

        socket.onopen = () => {
            console.log("[WS] Connected");
            status.set("OPEN");
            retries = RETRIES; // Reset retries on successful connection
        };

        socket.onclose = () => {
            console.log("[WS] Disconnected");
            status.set("CLOSED");
        };
        
        socket.onerror = (error: any) => {
            console.error("[WS] Error:", error);
            status.set("CLOSED");
            if (retries > 0) {
                retries--;
                console.log(`[WS] Retrying... (${RETRIES - retries}/${RETRIES})`);
                setTimeout(connect, 1000); // Retry after 1 second
            } else {
                console.error("[WS] Max retries reached. Giving up.");
            }
        };

        socket.onmessage = (event) => {
            const message: WebSocketMessage = JSON.parse(event.data);
            messages.set(message);
        };
    }

    function send(event: string, data: any, msg?: string) {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ event, data }));
        } else {
            console.error("[WS] WebSocket is not open. Ready state:", socket.readyState);
        }
    }

    function close() {
        if (socket) {
            socket.close();
        }
    }

    connect();

    return {
        messages,
        status,
        send,
        close
    };
}
