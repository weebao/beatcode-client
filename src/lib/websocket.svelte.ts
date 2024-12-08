const RETRIES = 3;

export type JSONData = Record<string, any>;
export interface WebSocketMessage {
    type: string;
    data: JSONData;
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
            console.error("[WS] No URL set");
            return;
        }
        socket = new WebSocket(url, [`access_token|${token}`]);
        status = "CONNECTING";
        console.log("[WS] Connecting to", url);

        socket.onopen = () => {
            console.log("[WS] Connected");
            status = "OPEN";
            reason = null;
        };

        socket.onclose = (e) => {
            console.log(e);
            if (e.reason && e.reason !== "") {
                reason = e.reason;
            }
            console.log(`[WS] Connection closed: ${e.code} ${e.reason}`);
            console.log(retries);
            if (retries > 0) {
                retries--;
                status = "CONNECTING";
                console.log(`[WS] Retrying... (Retries left: ${retries}/${RETRIES})`);
                setTimeout(connect, 1000); // Retry after 1 second
            } else {
                status = "CLOSED";
                console.log("[WS] Closing socket connection.");
            }
        };

        socket.onerror = (e) => {
            console.error("[WS] Error:", e);
        };

        socket.onmessage = (e) => {
            const newMessage = JSON.parse(e.data);
            console.log("[WS] Message received:", newMessage.type, newMessage.data);
            message = newMessage;
        };
    }

    function send(type: string, data?: JSONData) {
        console.log("[WS] Sending message:", type, data);
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ type, data }));
        } else {
            console.error("[WS] WebSocket is not open. Ready state:", socket?.readyState);
        }
    }

    function close() {
        if (socket) {
            console.log("[WS] Manually close connection");
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
