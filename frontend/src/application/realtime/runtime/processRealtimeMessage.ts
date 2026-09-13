import {
  normalizeRealtimeEvent,
} from "./normalizeRealtimeEvent";

import {
  routeRealtimeEvent,
} from "../routing/realtimeEventRouter";

import {
  recordRealtimeHeartbeat,
} from "../connection/realtimeHeartbeat";

import type {
  RealtimeMessage,
} from "../contracts/realtimeMessage";

export function processRealtimeMessage(
  message: RealtimeMessage,
): string[] {
  if (
    message.type ===
    "heartbeat"
  ) {
    recordRealtimeHeartbeat();

    return [
      "heartbeat",
    ];
  }

  if (
    message.type !==
    "event"
  ) {
    return [
      `message:${message.type}`,
    ];
  }

  const event =
    normalizeRealtimeEvent(
      message.payload,
    );

  if (!event) {
    return [
      "event:invalid",
    ];
  }

  return routeRealtimeEvent(
    event,
  );
}
