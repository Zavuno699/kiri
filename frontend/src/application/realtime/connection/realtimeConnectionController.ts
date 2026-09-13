import {
  getRealtimeConnectionState,
  setRealtimeConnectionState,
} from "../state/realtimeConnectionStore";

let socket:
  WebSocket | null = null;

export function connectRealtime(
  endpoint: string,
): void {
  const current =
    getRealtimeConnectionState();

  setRealtimeConnectionState({
    ...current,
    status: "connecting",
    endpoint,
    lastError: null,
  });

  if (
    typeof WebSocket ===
    "undefined"
  ) {
    setRealtimeConnectionState({
      ...getRealtimeConnectionState(),
      status:
        "error",
      lastError:
        "WebSocket unavailable",
    });

    return;
  }

  socket =
    new WebSocket(
      endpoint,
    );

  socket.onopen = () => {
    const state =
      getRealtimeConnectionState();

    setRealtimeConnectionState({
      ...state,
      status:
        "connected",
      connectedAt:
        new Date().toISOString(),
      disconnectedAt:
        null,
      reconnectAttempt:
        0,
      lastError:
        null,
    });
  };

  socket.onclose = () => {
    const state =
      getRealtimeConnectionState();

    setRealtimeConnectionState({
      ...state,
      status:
        "disconnected",
      disconnectedAt:
        new Date().toISOString(),
    });
  };

  socket.onerror = () => {
    const state =
      getRealtimeConnectionState();

    setRealtimeConnectionState({
      ...state,
      status:
        "error",
      lastError:
        "Realtime connection error",
    });
  };
}

export function disconnectRealtime(): void {
  if (socket) {
    socket.close();
    socket = null;
  }

  const state =
    getRealtimeConnectionState();

  setRealtimeConnectionState({
    ...state,
    status:
      "disconnected",
    disconnectedAt:
      new Date().toISOString(),
  });
}

export function getRealtimeSocket(): WebSocket | null {
  return socket;
}
