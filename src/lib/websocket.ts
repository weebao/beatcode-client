const RETRIES = 3;

export interface WebSocketMessage {
    event: string;
    data: any;
}

export function createWebSocket(url: string) {
    let message = $state<WebSocketMessage | null>(null);
    let status = $state<"CONNECTING" | "OPEN" | "CLOSING" | "CLOSED">("CONNECTING");
    let socket: WebSocket;
    let retries = RETRIES;

    function connect() {
        socket = new WebSocket(url);

        socket.onopen = () => {
            console.log("[WS] Connected");
            status = "OPEN";
            retries = RETRIES; // Reset retries on successful connection
        };

        socket.onclose = () => {
            console.log("[WS] Disconnected");
            status = "CLOSED";
        };

        socket.onerror = (error: any) => {
            console.error("[WS] Error:", error);
            status = "CLOSED";
            if (retries > 0) {
                retries--;
                console.log(`[WS] Retrying... (${RETRIES - retries}/${RETRIES})`);
                setTimeout(connect, 1000); // Retry after 1 second
            } else {
                console.error("[WS] Max retries reached. Giving up.");
            }
        };

        socket.onmessage = (event) => {
            message = JSON.parse(event.data);
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
        get message() { return message },
        get status() { return status },
        send,
        close
    };
}
