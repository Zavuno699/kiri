import {
  getRealtimeSocket,
} from "../connection/realtimeConnectionController";

import {
  normalizeRealtimeEvent,
} from "./normalizeRealtimeEvent";

import {
  refreshFromRealtimeEvent,
} from "../refresh/realtimeRefreshCoordinator";

export function attachRealtimeRefreshBridge(): void {
  const socket =
    getRealtimeSocket();

  if (!socket) {
    return;
  }

  socket.addEventListener(
    "message",
    (
      message,
    ) => {
      try {
        const parsed =
          JSON.parse(
            String(
              message.data,
            ),
          );

        const event =
          normalizeRealtimeEvent(
            parsed?.payload,
          );

        if (!event) {
          return;
        }

        void refreshFromRealtimeEvent(
          event.eventType,
        );
      } catch {
        // Ignore malformed realtime messages.
      }
    },
  );
}
