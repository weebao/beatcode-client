import type { RoomInfo } from "./models/room";
import { log } from "./utils";

const RETRIES = 3;

export interface WebSocketMessage {
    type: string;
    data: any;
    rooms?: RoomInfo[]; // For some reasons...
}

export function createWebSocket(token: string, socketUrl?: string) {
    let url = $state<string | undefined>(socketUrl);
    let message = $state<WebSocketMessage | null>(null);
    let status = $state<"CONNECTING" | "OPEN" | "CLOSING" | "CLOSED" | "NONE">("NONE");
    let socket = $state<WebSocket>();
    let retries = $state<number>(RETRIES);
    let reason = $state<string | null>(null);

    function setUrl(socketUrl: string) {
        if (url !== socketUrl) {
            retries = RETRIES;
            url = socketUrl;
        }
    }

    function connect() {
        if (!url) {
            log("[WS] No URL set");
            return;
        }
        socket = new WebSocket(url, [`access_token|${token}`]);
        status = "CONNECTING";
        log("[WS] Connecting to", url);

        socket.onopen = () => {
            log("[WS] Connected");
            status = "OPEN";
            reason = null;
        };

        socket.onclose = (e) => {
            log(e);
            if (e.reason && e.reason !== "") {
                reason = e.reason;
            }
            log(`[WS] Connection closed: ${e.code} ${e.reason}`);
            log(retries);
            if (retries > 0) {
                retries--;
                status = "CONNECTING";
                log(`[WS] Retrying... (Retries left: ${retries}/${RETRIES})`);
                setTimeout(connect, 1000); // Retry after 1 second
            } else {
                status = "CLOSED";
                log("[WS] Closing socket connection.");
            }
        };

        socket.onerror = (e) => {
            log("[WS] Error:", e);
        };

        socket.onmessage = (e) => {
            const newMessage = JSON.parse(e.data);
            log("[WS] Message received:", newMessage.type, newMessage.data);
            message = newMessage;
        };
    }

    function send(type: string, data?: any) {
        log("[WS] Sending message:", type, data);
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ type, data }));
        } else {
            log("[WS] WebSocket is not open. Ready state:", socket?.readyState);
        }
    }

    function close() {
        if (socket) {
            log("[WS] Manually close connection");
            retries = 0;
            socket.close();
        }
    }

    return {
        get message() {
            return message;
        },
        get status() {
            return status;
        },
        get reason() {
            return reason;
        },
        send,
        close,
        connect,
        setUrl
    };
}
