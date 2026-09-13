import type {
  RealtimeConnectionState,
} from "../contracts/realtimeConnectionState";

let state: RealtimeConnectionState = {
  status: "idle",
  endpoint: null,
  connectedAt: null,
  disconnectedAt: null,
  lastHeartbeatAt: null,
  reconnectAttempt: 0,
  lastError: null,
};

export function getRealtimeConnectionState(): RealtimeConnectionState {
  return state;
}

export function setRealtimeConnectionState(
  next: RealtimeConnectionState,
): void {
  state = next;
}
