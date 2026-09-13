import {
  getRealtimeConnectionState,
  setRealtimeConnectionState,
} from "../state/realtimeConnectionStore";

export function recordRealtimeHeartbeat(): void {
  const state =
    getRealtimeConnectionState();

  setRealtimeConnectionState({
    ...state,
    lastHeartbeatAt:
      new Date().toISOString(),
  });
}
