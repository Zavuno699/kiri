export type RealtimeConnectionStatus =
  | "idle"
  | "connecting"
  | "connected"
  | "reconnecting"
  | "disconnected"
  | "error";

export interface RealtimeConnectionState {
  status: RealtimeConnectionStatus;
  endpoint: string | null;
  connectedAt: string | null;
  disconnectedAt: string | null;
  lastHeartbeatAt: string | null;
  reconnectAttempt: number;
  lastError: string | null;
}
