import {
  getRealtimeConnectionState,
  setRealtimeConnectionState,
} from "../state/realtimeConnectionStore";

export function beginRealtimeReconnect(): number {
  const state =
    getRealtimeConnectionState();

  const attempt =
    state.reconnectAttempt + 1;

  setRealtimeConnectionState({
    ...state,
    status:
      "reconnecting",
    reconnectAttempt:
      attempt,
  });

  return attempt;
}
