export interface RealtimeMessage {
  type:
    | "event"
    | "heartbeat"
    | "ack"
    | "error"
    | "connected"
    | "disconnected";
  payload: unknown;
}
