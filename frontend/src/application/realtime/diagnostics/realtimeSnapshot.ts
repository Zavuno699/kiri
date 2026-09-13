import {
  getRealtimeConnectionState,
} from "../state/realtimeConnectionStore";

export function getRealtimeSnapshot() {
  const state =
    getRealtimeConnectionState();

  return {
    status:
      state.status,

    endpoint:
      state.endpoint,

    connectedAt:
      state.connectedAt,

    disconnectedAt:
      state.disconnectedAt,

    lastHeartbeatAt:
      state.lastHeartbeatAt,

    reconnectAttempt:
      state.reconnectAttempt,

    lastError:
      state.lastError,
  };
}
