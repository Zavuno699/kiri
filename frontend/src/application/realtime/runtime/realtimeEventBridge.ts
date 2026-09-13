import {
  processRealtimeMessage,
} from "./processRealtimeMessage";

import type {
  RealtimeMessage,
} from "../contracts/realtimeMessage";

import {
  getRealtimeSocket,
} from "../connection/realtimeConnectionController";

export function attachRealtimeEventBridge(): void {
  const socket =
    getRealtimeSocket();

  if (!socket) {
    return;
  }

  socket.onmessage = (
    message,
  ) => {
    try {
      const payload =
        JSON.parse(
          String(
            message.data,
          ),
        ) as RealtimeMessage;

      processRealtimeMessage(
        payload,
      );
    } catch {
      // Invalid realtime payloads are ignored fail-closed.
    }
  };
}
